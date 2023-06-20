import Category from '../../models/Category.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import createReport from '../../utils/report.js';

const getAllCategories = catchAsync(async (req, res, next) => {
  // const categories = await new ApiFeatures(Category, req.query).get();
  // find only the categories with id 24 and 25
  const categories = await Category.findAll({
    where: {
      id: [24, 25],
    },
  });
  res.json(categories);
});

const getCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  // if id not 24 or 25 throw error
  if (id !== '24' && id !== '25') {
    return next(new AppError(`Category with this id ${id} not found`, 404));
  }
  const category = await Category.findByPk(id);
  if (!category) {
    return next(new AppError(`Category with this id ${id} not found`, 404));
  }
  res.json(category);
});

// const createCategory = catchAsync(async (req, res) => {
//   const { name } = req.body;
//   const category = await Category.create({
//     name,
//   });
//   await createReport(req, 'create new category name: ' + name);
//   res.status(201).json({ data: category });
// });

// const updateCategory = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const category = await Category.findByPk(id);
//   if (!category) {
//     return next(new AppError(`Category with this id ${id} not found`, 404));
//   }
//   await category.update({
//     ...req.body,
//   });

//   await createReport(req, 'updated category named : ' + category.name);
//
//   res.json(category);
//   next();
// });

// const inactiveCategory = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const category = await Category.findByPk(id);
//
//   if (!category) {
//     return next(new AppError(`Category with id ${id} not found`, 404));
//   }
//
//   await category.toggleActive();
//
//   if (category.active)
//     await createReport(req, 'activated category named : ' + category.name);
//   else await createReport(req, 'deactivated category named : ' + category.name);
//   res.json({ message: 'Category updated', category });
// });

export {
  getAllCategories,
  getCategoryById,
  // updateCategory,
  // inactiveCategory,
  // createCategory,
};
