const UserDto = require("../dtos/UserDto");
const { User, Role } = require("../models/models")
const getPaginationParams = require("../utils/getPaginationParams");

class UserController {
    async getAll(req, res) {
        let {limit, page} = req.query

        const limitOffset = getPaginationParams(page, limit)

        let users;
        
        const data = await User.scope('rolesInclude').findAndCountAll(limitOffset)
        users = data.rows.map(user => new UserDto(user));

        return res.json({
            count: data.count,
            users
        })
    }   
}

module.exports = new UserController()