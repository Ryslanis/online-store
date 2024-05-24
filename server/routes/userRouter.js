const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getAll } = require("../controllers/userController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const constants = require("../utils/constants");

const router = new Router()

router.get('/', [authMiddleware], getAll)


module.exports = router;