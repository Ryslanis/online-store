const Ajv = require("ajv")
const { validationResult, body } = require('express-validator');
const ApiError = require('../errors/ApiError');
const { deviceInfoSchema } = require("../schemas/schemas");

const ajv = new Ajv()

module.exports = [
    body('name').notEmpty().withMessage('Name is required'),
    body('brandId').notEmpty().withMessage('Brand ID is required').isNumeric().withMessage('Brand ID must be a number'),
    body('typeId').notEmpty().withMessage('Type ID is required').isNumeric().withMessage('Type ID must be a number'),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
    body('info').optional().custom(value => {
        //as ARRAY from form-data we need to parse it 
      infoArray = JSON.parse(value);
     

      const validate = ajv.compile(deviceInfoSchema)
      const valid = ajv.validate(deviceInfoSchema, infoArray);
      if (!valid) {
        throw ApiError.badRequest(validate.errors);
      }
      return true;
    
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw ApiError.badRequest(errors.errors);
        }
        next();
    }
];

