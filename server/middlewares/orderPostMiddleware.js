const { body, validationResult } = require('express-validator');


const ApiError = require("../errors/ApiError");
const { ORDER_ADDRESS_MAX_LENGTH, ORDER_COMMENT_MAX_LENGTH } = require('../constants/constrains');

minLengthAddress = 10
minLengthComment = 10

module.exports = [
    body('address').isLength({ min: minLengthAddress, max: ORDER_ADDRESS_MAX_LENGTH })
        .withMessage(`Min-max length: ${minLengthAddress}-${ORDER_ADDRESS_MAX_LENGTH}`),
    body('comment').isLength({ min: minLengthComment, max: ORDER_COMMENT_MAX_LENGTH })
        .withMessage(`Min-max length: ${minLengthComment}-${ORDER_COMMENT_MAX_LENGTH}`),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw ApiError.badRequest(errors);
    }
    next();
  }
];

