const ApiErorr = require('../errors/ApiError')

module.exports = function(err, req, res, next) {
    if (err instanceof ApiErorr) {
        return res.status(err.status).json({message: err.message})
    }
    console.log(err)
    return res.status(500).json({message: `Unexpecterd error`})
}