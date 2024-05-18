const { Router } = require("express");
const { getAll, create } = require("../controllers/brandController");

const router = new Router()

router.get('/', getAll)
router.post('/', create)

module.exports = router;