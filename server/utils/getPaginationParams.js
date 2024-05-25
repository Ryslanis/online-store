const { DEFAULT_API_LIMIT_RESULTS } = require("./constants");

module.exports = function getPaginationParams(page, limit) {
    page = Number(page) || 1;
    limit = Number(limit) || DEFAULT_API_LIMIT_RESULTS;
    const offset = (page - 1) * limit;
    return { limit, offset };
}