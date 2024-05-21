const { Router } = require("express")
const userRouter = require("./userRouter")
const authRouter = require("./authRouter")
const typeRouter = require("./typeRouter")
const brandRouter = require("./brandRouter")
const deviceRouter  = require("./deviceRouter")


const router = new Router()

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

module.exports = router;