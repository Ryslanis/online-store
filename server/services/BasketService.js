const ApiError = require("../errors/ApiError")
const { Basket, BasketDevice } = require("../models/models")
const { allowOnlyOwner } = require("../utils/allowRules")
const OrderService = require("./OrderService")

class BasketService {
    async createNewBasket(userId) {
        const basket = Basket.create({userId})
        return basket
    }

    async addItem(userId, deviceId) {
        let basket = await Basket.findOne({where: {userId}, order: [['createdAt', 'DESC']]})
        
        const basketDevice = await BasketDevice.create({deviceId, basketId: basket.id})
        return basketDevice
    }
    
    async getAllBasketBevices(userId) {
        const basket = await Basket.findOne({where: {userId}, order: [['createdAt', 'DESC']]})
        const basketDevices = await BasketDevice.findAndCountAll({where: {basketId: basket.id}})
        return basketDevices
    }

    
    async removeItem(id, userId) {
        const basketDevice = await BasketDevice.findOne({ where: { id } });

        if (!basketDevice) {
            throw ApiError.notFound()
        }

        allowOnlyOwner(userId, userId)

        const deletedBasketDevice = await BasketDevice.destroy({where: {id}})
        return deletedBasketDevice
    }
}

module.exports = new BasketService();