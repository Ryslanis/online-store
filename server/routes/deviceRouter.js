const { Router } = require("express");
const { create, getAll, getOne } = require("../controllers/deviceController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = new Router()

router.post('/', [authMiddleware, roleMiddleware(["ADMIN"])], create)
router.get('/', getAll)
router.get('/:id', getOne)


module.exports = router;