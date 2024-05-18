class ApiErorr extends Error {
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static internal(message) {
        return new ApiErorr(500, message)
    }

    static badRequest(message) {
        return new ApiErorr(404, message)
    }

    static forbidden(message) {
        return new ApiErorr(403, message)
    }
}

module.exports = ApiErorr