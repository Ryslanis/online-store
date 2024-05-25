const ApiError = require("../errors/ApiError")
const { User, Role, Basket } = require("../models/models")
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const TokenService = require("./TokenService")
const UserDto = require("../dtos/UserDto")
const constants = require("../utils/constants")

class AuthService {
    async registration(email, password) {
        if (!email || !password) {
            throw ApiError.badRequest(`No email or password`)
        }
        const candidate = await User.findOne({where : {email}})
        if (candidate) {
            throw ApiError.badRequest(`User with email ${email} exists`)
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4()
        let user = await User.create({email, password: hashPassword, activationLink})
        const userRole = await Role.findOne({ where: { name: constants.ROLE_CUSTOMER } })
        await user.addRole(userRole)
        user = await User.scope('rolesInclude').findOne({where: {email}})

        await Basket.create({userId: user.id})

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto})
        
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async login(email, password) {
        const user = await User.findOne({where: {email}, include: [{model: Role, as: 'roles'}]})
        if (!user) {
            throw ApiError.notFound(`User with email ${email} not found`)
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            throw ApiError.badRequest(`Wrong password`)
        }

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await User.findOne({where:{id: userData.id}});
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
}

module.exports = new AuthService()