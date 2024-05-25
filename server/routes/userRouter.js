const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getAll } = require("../controllers/userController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const constants = require("../utils/constants");
const paginationMiddleware = require("../middlewares/paginationMiddleware");

const router = new Router()

router.get('/', [authMiddleware, roleMiddleware(constants.ROLE_CUSTOMER), paginationMiddleware], getAll)


module.exports = router;