import Page from '../../models/StaticPage.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import ApiFeatures from '../../utils/apiFeatures.js';

const getAllPages = catchAsync(async (req, res, next) => {
  const staticPage = await new ApiFeatures(Page, req.query).get();
  res.json(staticPage);
});

const createPage = catchAsync(async (req, res, next) => {
  const createPage = await Page.create({
    ...req.body
  });
  res.status(201).json({ data: createPage });
  next();
});

const updatePage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatePage = await Page.findByPk(id);
  if (!updatePage) {
    return next(new AppError(`Category with this id ${id} not found`, 404));
  }
  await updatePage.update({
    ...req.body
  });
  res.json(updatePage);
  next();
});

const deletePage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const page = await Page.findByPk(id);
  if (!page) {
    return next(new AppError(`Page with id ${id} not found`, 404));
  }

  await page.destroy();

  res.json({ message: 'Page deleted successfully' });
});

export { getAllPages, createPage, updatePage, deletePage };
