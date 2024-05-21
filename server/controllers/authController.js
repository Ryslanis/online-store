const bcrypt = require('bcrypt')
const ApiErorr = require("../errors/ApiError");
const { User, Basket, Role } = require("../models/models");
const generateJwt = require('../utils/generateJwt');
const constants = require('../utils/constants');


class AuthController {
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
        const userRole = await Role.findOne({ where: { name: constants.ROLE_CUSTOMER } })
        user.addRole(userRole)
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, email, [userRole.dataValues])
        return res.json({token})  
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}, include: [{model: Role, as: 'roles'}]})
        if (!user) {
            return next(ApiErorr.notFound(`User with email ${email} not found`))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiErorr.badRequest(`Wrong password`))
        }
        console.log(user)
        const token = generateJwt(user.id, email, user.roles)
        return res.json(token)
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new AuthController();
