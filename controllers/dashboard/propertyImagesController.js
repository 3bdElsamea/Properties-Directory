import propertyImage from '../../models/PropertyImage.js';
import property from '../../models/Property.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import createReport from '../../utils/report.js';

const createPropertyImage = catchAsync(async (req, res, next) => {
  const propertyId = req.params.id;
  const propertyExists = await property.findByPk(propertyId);
  if (!propertyExists) {
    return next(new AppError('Property not found', 404));
  }

  if (req.file) {
    req.body.image = req.file.location;
  } else {
    next(new AppError('Please upload Image file', 400));
  }

  const image = await propertyImage.create({
    image: req.body.image,
    property_id: propertyId,
  });

  await createReport(req, `Added new image to property with id ${propertyId}`);

  res.json(image);
});

const deletePropertyImage = catchAsync(async (req, res, next) => {
  const image = await propertyImage.findByPk(req.params.id);
  if (image) {
    await image.destroy();
    await createReport(req, `Removed image with id ${req.params.id}`);
    res.json({ message: 'Image removed' });
  }
  return next(new AppError('Image not found', 404));
});

export { createPropertyImage, deletePropertyImage };
