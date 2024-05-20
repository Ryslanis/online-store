const jwt = require('jsonwebtoken')
const ApiErorr = require("../errors/ApiError")

module.exports = function(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return next(ApiErorr.notAuthorized())
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decodedToken
        next()
    } catch (error) {
        return next(ApiErorr.notAuthorized())
    }
}