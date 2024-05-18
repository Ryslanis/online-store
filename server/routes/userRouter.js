const { Router } = require("express");
const { auth, login, registration } = require("../controllers/userController");

const router = new Router()

router.post('/registration', registration)
router.post('/login', login)
router.get('/auth', auth)


module.exports = router;