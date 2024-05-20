const { Router } = require("express");
const { auth, login, registration } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router()

router.post('/registration', registration)
router.post('/login', login)
router.get('/auth', authMiddleware, auth)


module.exports = router;