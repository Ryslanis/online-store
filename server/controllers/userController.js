const { User, Role } = require("../models/models")
const { LIMIT_API_RESULTS } = require("../settings")

class UserController {
    async getAll(req, res) {
        let {limit, page} = req.query

        page = page || 1
        limit = limit || LIMIT_API_RESULTS

        const offset = page * limit - limit

        let users;

        users = await User.findAndCountAll({limit, offset, include: [{model: Role, as: 'roles'}]})

        return res.json(users)
    }
}

module.exports = new UserController()