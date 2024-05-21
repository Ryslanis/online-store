const { Router } = require("express");
const { check, login, registration } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router()

router.post('/registration', registration)
router.post('/login', login)
router.get('/check', authMiddleware, check)


module.exports = router;