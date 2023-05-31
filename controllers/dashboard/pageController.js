import Page from '../../models/StaticPage.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import ApiFeatures from '../../utils/apiFeatures.js';

const getAllPages = catchAsync(async (req, res, next) => {
  const staticPage = await new ApiFeatures(Page, req.query).get();
  res.json(staticPage);
});

const createPage = catchAsync(async (req, res, next) => {
  const { name, content } = req.body;
  const createPage = await Page.create({
    name,
    content,
    //slug: slugify(name)
  });
  res.status(201).json({ data: createPage });
  next();
});

const updatePage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, content } = req.body;
  const updatePage = await Page.findByPk(id);
  if (!updatePage) {
    return next(new AppError(`Category with this id ${id} not found`, 404));
  }
  updatePage.name = name;
  updatePage.content = content;
  await updatePage.save();
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

export default deletePage;

export { getAllPages, createPage, updatePage, deletePage };
