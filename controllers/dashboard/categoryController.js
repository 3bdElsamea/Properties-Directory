import Category from '../../models/Category.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import ApiFeatures from '../../utils/apiFeatures.js';

const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await new ApiFeatures(Category, req.query).get();
  res.json(categories);
});

const getCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) {
    return next(new AppError(`Category with this id ${id} not found`, 404));
  }
  res.json(category);
});

const createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.create({
    name,
  });
  res.status(201).json({ data: category });
  next();
});

const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) {
    return next(new AppError(`Category with this id ${id} not found`, 404));
  }
  await category.update({
    ...req.body,
  })

  res.json(category);
  next();
});

const inactiveCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    return next(new AppError(`Category with id ${id} not found`, 404));
  }

  await category.toggleActive();

  res.json({ message: 'Category updated', category });
});

export {
  getAllCategories,
  getCategoryById,
  updateCategory,
  inactiveCategory,
  createCategory,
};
