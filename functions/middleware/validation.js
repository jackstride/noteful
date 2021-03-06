const createError = require("http-errors");
const { check, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    check("firstName", "Enter a first name")
      .not()
      .isEmpty(),
    check("lastName", "Enter a first name")
      .not()
      .isEmpty(),
    check("password", "Enter a first name")
      .not()
      .isEmpty(),
    check("email", "There is no email").isEmail()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(createError(422, "There appears to be an error registering."));
  } else {
    return next();
  }
};

module.exports = {
  userValidationRules,
  validate
};
