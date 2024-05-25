const jwt = require('jsonwebtoken')
const ApiError = require("../errors/ApiError")
const TokenService = require('../services/TokenService')

module.exports = function(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const accessToken = req.headers.authorization?.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.notAuthorized())
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.notAuthorized());
        }
        req.user = userData;
        next()
    } catch (error) {
        return next(ApiError.notAuthorized())
    }
}