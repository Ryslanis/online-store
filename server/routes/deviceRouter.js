const { Router } = require("express");
const { create, getAll, getOne } = require("../controllers/deviceController");

const router = new Router()

router.post('/', create)
router.get('/', getAll)
router.get('/:id', getOne)


module.exports = router;