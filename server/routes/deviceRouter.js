const { Router } = require("express");
const { create, getAll, getOne } = require("../controllers/deviceController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const deviceMiddleware = require("../middlewares/deviceMiddleware");
const imageUploadMiddleware = require("../middlewares/imageUploadMiddleware");

const router = new Router()

router.post('/', [authMiddleware, roleMiddleware("ADMIN"), deviceMiddleware, imageUploadMiddleware], create)
router.get('/', getAll)
router.get('/:id', getOne)


module.exports = router;