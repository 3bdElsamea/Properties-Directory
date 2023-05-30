export default (req, res, next) => {
  for (const key in req.body) {
    if(typeof req.body[key] === 'string')
      req.body[key] = req.body[key].trim();
  }
  next();
};
