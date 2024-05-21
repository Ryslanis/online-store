const jwt = require('jsonwebtoken')

module.exports = function generateJwt (id, email, roles) {
    return jwt.sign(
        {id, email, roles},
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h'}
    )
}