import Category from '../../models/Category.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';

const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll({
    where: {
      id: [24, 25],
    },
  });
  res.json(categories);
});

const getCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id !== '24' && id !== '25') {
    return next(new AppError(`Category with this id ${id} not found`, 404));
  }
  const category = await Category.findByPk(id);
  if (!category) {
    return next(new AppError(`Category with this id ${id} not found`, 404));
  }
  res.json(category);
});

export { getAllCategories, getCategoryById };
