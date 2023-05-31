import propertyImage from '../../models/PropertyImage.js';
import property from '../../models/Property.js';
import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';

const createPropertyImage = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.location;
  } else {
    next(new AppError('Please upload a file', 400));
  }
  const propertyId = req.params.id;
  const propertyExists = await property.findByPk(propertyId);
  if (!propertyExists) {
    return next(new AppError('Property not found', 404));
  }

  const image = await propertyImage.create({
    image: req.body.image,
    property_id: propertyId,
  });
  res.json(image);
});

const deletePropertyImage = catchAsync(async (req, res, next) => {
  const image = await propertyImage.findByPk(req.params.id);
  if (image) {
    await image.destroy();
    res.json({ message: 'Image removed' });
  }
  return next(new AppError('Image not found', 404));
});

export { createPropertyImage, deletePropertyImage };
