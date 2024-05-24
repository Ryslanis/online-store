class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    //400
    static badRequest(message) {
        return new ApiError(400, message)
    }

    static  notAuthorized(message) {
        message = message || "Not authorized"
        return new ApiError(401, message)
    }

    static forbidden(message) {
        message = message || "Don't have access"
        return new ApiError(403, message)
    }

    static notFound(message) {
        message = message || "Not found"
        return new ApiError(404, message)
    }
    //500
    static internal(message) {
        message = message || "Server  error"
        return new ApiError(500, message)
    }
}

module.exports = ApiError