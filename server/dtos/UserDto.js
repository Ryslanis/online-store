module.exports = class UserDto {
    constructor(model) {
        this.id = model.id
        this.email = model.email
        this.roles = model.roles
        this.createdAt = model.createdAt
    }
}