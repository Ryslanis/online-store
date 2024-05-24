const { Router } = require("express");
const { check, login, registration, logout, refresh } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const AuthService = require("../services/AuthService");

const router = new Router()

router.post('/registration', registration)
router.post('/login', login)
router.post('/logout', logout)
router.get('/refresh', [authMiddleware], refresh)


module.exports = router;