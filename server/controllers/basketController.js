const BasketService = require("../services/BasketService")

class basketController {
    async create(req, res, next) {
        try {
            const { deviceId } = req.body
            const userId = req.user.id
            const basketDevice = await BasketService.addItem(userId, deviceId)
            return res.json(basketDevice)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const userId = req.user.id
            const basketDevices = await BasketService.getAllBasketBevices(userId)
        return res.json(basketDevices)
        } catch (error) {
            next(error)
        }
    }

    async _delete(req, res, next) {
        try {
            const { id } = req.params
            const deletedBasketDevice = await BasketService.deleteDevice(id, req.user.id)
            return res.json(deletedBasketDevice)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new basketController();