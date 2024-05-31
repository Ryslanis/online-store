const { validationResult, query } = require('express-validator');
const ApiError = require("../errors/ApiError");
const roles = require('../constants/roles');


module.exports = [
    query('email').optional().isEmail().withMessage('Invalid email'),
    query('role').toUpperCase().optional().isIn(Object.values(roles)).withMessage('Invalid role'),
    query('sortBy').optional().isIn(['name', 'email', 'role', 'data']).withMessage('Invalid sort field'),
    query('sortOrder').optional().isIn(['ASC', 'DESC']).withMessage('Invalid sort order'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw ApiError.badRequest(errors);
    }
    next();
  }
];

