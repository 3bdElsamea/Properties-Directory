import Page from '../../models/StaticPage.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import createReport from '../../utils/report.js';

const getAllPages = catchAsync(async (req, res, next) => {
  const staticPage = await new ApiFeatures(Page, req.query).get();
  res.json(staticPage);
});

const createPage = catchAsync(async (req, res, next) => {
  const createPage = await Page.create({
    ...req.body,
  });
  await createReport(req, `Created a new page with name ${req.body.name}`);
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
    ...req.body,
  });
  await createReport(req, `Updated page with name ${req.body.name}`);
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
  await createReport(req, `Deleted page with name ${page.name}`);

  res.json({ message: 'Page deleted successfully' });
});

export { getAllPages, createPage, updatePage, deletePage };
