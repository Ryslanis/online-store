const ApiErorr = require('../errors/ApiError')

module.exports = function(err, req, res, next) {
    if (err instanceof ApiErorr) {
        return res.status(err.status).json({errors: err.message})
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        const field = err.errors[0].path;
        return res.status(400).json({ error: {message: 'Unique constraint violation: this value must be unique.'} });
    }

    if (err.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({ error: {message: 'Foreign key constraint violation'} });
    }

    console.log(err)
    return res.status(500).json({message: `Unexpecterd error`})
}