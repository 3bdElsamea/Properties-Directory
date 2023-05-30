import AppError from './appError.js';

async function checkFkExists(model, id, req, res, next) {
  const modelRecord = await model.findByPk(id);
  if (!modelRecord) {
    return next(new AppError(`${model.name} not found`, 404));
  }
  return modelRecord;
}

export default checkFkExists;
