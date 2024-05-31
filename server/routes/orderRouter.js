const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { ROLE_CUSTOMER, ROLE_ADMIN, ROLE_MANAGER } = require("../constants/roles");
const { getAll, create, _delete, getOne } = require("../controllers/orderController");
const orderPostMiddleware = require("../middlewares/orderPostMiddleware");
const orderGetMiddleware = require("../middlewares/orderGetMiddleware");

const router = new Router()


router.get('/:id', [authMiddleware], getOne)
router.get('/', [authMiddleware, roleMiddleware([ROLE_ADMIN, ROLE_MANAGER, ROLE_CUSTOMER]), orderGetMiddleware], getAll)
router.post('/', [authMiddleware, orderPostMiddleware], create)
router.delete('/:id', [authMiddleware], _delete)


module.exports = router;