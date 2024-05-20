const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiErorr = require("../errors/ApiError");
const { User, Basket } = require("../models/models");


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiErorr.badRequest(`No email or password`))
        }
        const candidate = await User.findOne({where : {email}})
        if (candidate) {
            return next(ApiErorr.badRequest(`User with email ${email} exists`))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, email, user.role)
        return res.json({token})  
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiErorr.notFound(`User with email ${email} not found`))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiErorr.badRequest(`Wrong password`))
        }
        const token = generateJwt(user.id, email, user.role)
        return res.json(token)
    }

    async auth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController();
