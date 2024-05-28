const ApiError = require("../errors/ApiError")

module.exports = function imageUploadMiddleware(req, res, next) {
    if (!req.files?.img) {
        throw ApiError.badRequest('No image file')
    }
  
    if (req.files.img.mimetype.split('/')[0] !== 'image') {
        throw ApiError.badRequest('Only image accepted')
    }
    next()
  }
