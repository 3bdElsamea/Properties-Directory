import ContactUs from '../../models/ContactUs.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import ApiFeatures from '../../utils/apiFeatures.js';

const getAllContactsUs = catchAsync(async (req, res, next) => {
  const contactsUs = await new ApiFeatures(ContactUs, req.query).get();
  res.json(contactsUs);
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

export { getAllContactsUs, createContactUs };
