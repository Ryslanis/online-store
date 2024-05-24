const ApiError = require("../errors/ApiError");

module.exports = function (roles) {
    return function (req, res, next) {
        console.log(req.user)
        let hasRole = false;
        req.user.roles.forEach(role => {
            console.log(role)
            if (roles.includes(role)) {
                hasRole = true;
            }
        })
        if (!hasRole) {
            return next(ApiError.forbidden())
        } 
        
        next();
    }
}
