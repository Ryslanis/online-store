const { body, validationResult } = require('express-validator');

const minPasswordLength = 10
const maxPasswordLength = 20

const ApiError = require("../errors/ApiError");

module.exports = [
    body('email')
        .isEmail().withMessage('Invalid email address'),

    body('password')
        .isLength({minPasswordLength, maxPasswordLength}).withMessage(`Password must be ${minPasswordLength}-${maxPasswordLength} characters long`)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).withMessage("Password must include at least one uppercase letter, \
one lowercase letter, one number, and one special character"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw ApiError.badRequest(errors.errors);
    }
    next();
  }
];

