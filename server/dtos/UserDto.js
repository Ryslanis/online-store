module.exports = class UserDto {
    constructor(model) {
        this.id = model.id
        this.email = model.email
        this.roles = model.roles?.map(role => ({ id: role.id, name: role.name }))
    }
}