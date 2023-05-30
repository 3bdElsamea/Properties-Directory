export default (req, res, next) => {
  console.log(req.body);
  for (const key in req.body) {
    console.log(req.body[key]);
    if (typeof req.body[key] === 'string') {
      if (isNaN(req.body[key].trim())) {
        req.body[key] = req.body[key].trim();
      } else {
        req.body[key] = parseInt(req.body[key].trim());
      }
    }
  }
  next();
};
