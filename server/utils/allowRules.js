const ApiError = require("../errors/ApiError")

function allowOwnerOrSuperior(userId, ownerId, userRoles, allowRoles) {
    let isSuperior = false
    
    const isOwner = userId === ownerId

    if (userRoles || allowRoles) {
        isSuperior = userRoles.some(role => allowRoles.includes(role))
    } 
    
    if (!isOwner && !isSuperior) {
        throw ApiError.forbidden()
}
}

function allowOnlyOwner(userId, ownerId) {
    allowOwnerOrSuperior(userId, ownerId)
}



module.exports = {
    allowOnlyOwner,
    allowOwnerOrSuperior,
}

