const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getAll } = require("../controllers/userController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const constants = require("../utils/constants");

const router = new Router()

router.get('/', [authMiddleware, roleMiddleware([constants.ROLE_SUPER_ADMIN, constants.ROLE_ADMIN])], getAll)


module.exports = router;