const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { create, getAll, _delete } = require("../controllers/basketController");
const { ROLE_CUSTOMER, ROLE_MANAGER } = require("../constants/roles");

const router = new Router()

router.get('/', [authMiddleware], getAll)
router.post('/', [authMiddleware, ], create )
router.delete('/:id', [authMiddleware, roleMiddleware(ROLE_CUSTOMER, ROLE_MANAGER)], _delete)


module.exports = router;