const { Router } = require("express");
const { check, login, registration, logout, refresh } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const AuthService = require("../services/AuthService");
const credentialsMiddleware = require("../middlewares/credentialsMiddleware");

const router = new Router()

router.post('/registration', [credentialsMiddleware], registration)
router.post('/login', [credentialsMiddleware], login)
router.post('/logout', logout)
router.get('/refresh', [authMiddleware], refresh)


module.exports = router;