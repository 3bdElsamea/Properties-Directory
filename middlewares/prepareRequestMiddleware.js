export default (req, res, next) => {
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      if(isNaN(req.body[key].trim())){
        req.body[key] = req.body[key].trim();
      }else{
        req.body[key] = parseInt(req.body[key].trim());
      }
    }
  }
  next();
};
