const { Router } = require("express")
const userRouter = require("./userRouter")
const typeRouter = require("./typeRouter")
const brandRouter = require("./brandRouter")
const deviceRouter  = require("./deviceRouter")


const router = new Router()

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

module.exports = router;