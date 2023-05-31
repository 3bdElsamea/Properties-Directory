import Owner from '../../models/Owner.js';
import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';
import slugify from 'slugify';

const getAllOwners = catchAsync(async (req, res) => {
  const owners = await new ApiFeatures(Owner, req.query).get();
  res.json(owners);
});

const getOwnerById = catchAsync(async (req, res, next) => {
  const owner = await Owner.findByPk(req.params.id);
  if (!owner) {
    return next(new AppError('Owner not found', 404));
  }
  res.json(owner);
});

const createOwner = catchAsync(async (req, res) => {
  const owner = await Owner.create({
    ...req.body,
  });
  res.json(owner);
});

const updateOwner = catchAsync(async (req, res, next) => {
  const owner = await Owner.findByPk(req.params.id);
  if (owner) {
    const updatedOwner = await owner.update({
      ...req.body,
    });
    res.json(updatedOwner);
  } else {
    return next(new AppError('Owner not found', 404));
  }
});

const deleteOwner = catchAsync(async (req, res, next) => {
  const owner = await Owner.findByPk(req.params.id);
  if (owner) {
    await owner.destroy();
    res.json({ message: 'Owner removed' });
  } else {
    return next(new AppError('Owner not found', 404));
  }
});

export { getAllOwners, getOwnerById, createOwner, updateOwner, deleteOwner };
