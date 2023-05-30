import Category from '../../models/Category.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';

const getAllCategories = catchAsync(async (req, res, next) => {
  const pages = req.query.pages * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (pages - 1) * limit;

  const categories = await Category.findAll({
    offset: skip,
    limit: limit,
  });

  res.status(200).json({ data: categories.length, pages, categories });
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
    //slug: slugify(name)
  });
  res.status(201).json({ data: category });
  next();
});

const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByPk(id);
  if (!category) {
    return next(new AppError(`Category with this id ${id} not found`, 404));
  }
  category.name = name;
  await category.save();
  res.json(category);
  next();
});

const inactiveCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) {
    return next(new AppError(`Category with id ${id} not found`, 404));
  }
  category.active = category.active === 1 ? 0 : 1;
  await Category.update({ active: category.active }, { where: { id } });

  res.json({ data: 'updated active successfully' });
});

export {
  getAllCategories,
  getCategoryById,
  updateCategory,
  inactiveCategory,
  createCategory,
};
