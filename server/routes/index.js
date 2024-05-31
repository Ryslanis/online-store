const { Router } = require("express")
const userRouter = require("./userRouter")
const authRouter = require("./authRouter")
const typeRouter = require("./typeRouter")
const brandRouter = require("./brandRouter")
const deviceRouter  = require("./deviceRouter")
const basketRouter  = require("./basketRouter")
const orderRouter  = require("./orderRouter")


const router = new Router()

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)

module.exports = router;