const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getAll } = require("../controllers/userController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const paginationMiddleware = require("../middlewares/paginationMiddleware");
const { ROLE_CUSTOMER } = require("../constants/roles");

const router = new Router()

router.get('/', [authMiddleware, roleMiddleware(ROLE_CUSTOMER), paginationMiddleware], getAll)


module.exports = router;