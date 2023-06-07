import ContactUs from '../../models/ContactUs.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import ApiFeatures from '../../utils/apiFeatures.js';

const getAllContactsUs = catchAsync(async (req, res, next) => {
  const contactsUs = await new ApiFeatures(ContactUs, req.query).get();
  res.json(contactsUs);
});

const getContactUsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const getContactUsById = await ContactUs.findByPk(id);
  if (!getContactUsById) {
    return next(new AppError(`ContactUs with this id ${id} not found`, 404));
  }
  res.json(getContactUsById);
});

const createContactUs = catchAsync(async (req, res, next) => {
  const { name, email, phone, message } = req.body;

  const createContactUs = await ContactUs.create({
    name,
    email,
    phone,
    message,
  });
  res.status(201).json({ data: createContactUs });
  next();
});

const updateContactUs = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateContactUs = await ContactUs.findByPk(id);
  if (!updateContactUs) {
    return next(new AppError(`ContactUs with this id ${id} not found`, 404));
  }
  await updateContactUs.update({
    ...req.body,
  });

  res.json(updateContactUs);
  next();
});

const statusContactUs = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const contactUs = await ContactUs.findByPk(id);

  if (!contactUs) {
    return next(new AppError(`ContactUs with id ${id} not found`, 404));
  }

  const validStatusValues = ['active', 'pending', 'rejected'];
  if (!validStatusValues.includes(contactUs.status)) {
    return res.json({ message: 'ContactUs status is not valid' });
  }

  contactUs.status = status;
  await contactUs.save();

  res.json({ message: 'ContactUs updated', contactUs });
});

export {
  getAllContactsUs,
  getContactUsById,
  updateContactUs,
  statusContactUs,
  createContactUs,
};
