const OrderService = require("../services/OrderService")
const { ROLE_MANAGER, ROLE_ADMIN } = require("../constants/roles")

class orderController {
    async create(req, res, next) {
        try {
            const { address, comment } = req.body
            const userId = req.user.id
            const order = await OrderService.make(userId, address, comment)
            return res.json(order)
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params 
            const order = await OrderService.getLastOrder(id)
            return res.json(order)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            if (req.user.isAdmin) {
                const orders = await OrderService.getAllOrders(req.query)
                return res.json(orders)
            }
            const orders = await OrderService.getUserOrders(req.user.id)
            return res.json(orders)
        } catch (error) {
            next(error)
        }
    }

    async _delete(req, res, next) {
        try {
            const { id } = req.params
            const deletedOrder = await OrderService.deleteOrder(id, req.user.id, req.user.roles)
            return res.json(deletedOrder)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new orderController();