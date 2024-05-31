const ApiError = require("../errors/ApiError");
const { ROLE_ADMIN, ROLE_MANAGER, ROLE_SUPER_ADMIN } = require("../constants/roles");

module.exports = function (roles) {

    return function (req, res, next) {
        let hasRole = false;
        req.user.roles.forEach(role => {
            console.log(role.name, ROLE_ADMIN)
            if (role.name === ROLE_ADMIN || role.name === ROLE_SUPER_ADMIN) {
                req.user.isAdmin = true
            } 
            if (role.name === ROLE_MANAGER) {
                req.user.isManager = true
            } 

            if (roles.includes(role.name)) {
                hasRole = true;
            }
        })
        if (!hasRole) {
            return next(ApiError.forbidden())
        } 
        
        next();
    }
}
