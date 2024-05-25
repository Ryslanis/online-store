module.exports = class UserDto {
    constructor(model) {
        this.id = model.id
        this.email = model.email
        this.roles = model.roles?.map(role => role.name)
        this.createdAt = model.createdAt
    }
}