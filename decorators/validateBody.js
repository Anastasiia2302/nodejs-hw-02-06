const { HttpError } = require("../helpers");

const validateBody = (schemas) => {
  const fn = (req, res, next) => {
    const { error } = schemas.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next(error);
  };
  return fn;
};
module.exports = validateBody;
