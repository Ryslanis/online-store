const ApiError = require("../errors/ApiError");
const filtering = require("../models/filtering");
const { Basket, Order } = require("../models/models");
const { allowOwnerOrSuperior } = require("../utils/allowRules");
const { ROLE_MANAGER, ROLE_ADMIN } = require("../constants/roles");
const getPaginationParams = require("../utils/getPaginationParams");

class OrderService {
    async make(userId, address, comment) {
        const basket = await Basket.scope("basketDevices").findOne({where: {userId}, order: [['createdAt', 'DESC']]})
        if (basket.basket_devices.length == 0) {
            throw ApiError.badRequest("Basket is empty")
        }
            
        const order = await Order.create({address, comment, basketId: basket.id})

        // Create a new basket
        await Basket.create({userId})
        return order
    }

    async getOneByBasketId(basketId) {
        const order = await Order.findOne({where: {basketId}})
        return order
    }

    async getLastOrder(id) {
        const order = await Order.findOne({where: {basketId, order: [['createdAt', 'DESC']]}})
        return order
    }


    async getUserOrders(userId) {
        const baskets = await Basket.findAll({where: {userId}})
        let orders = []
        if (baskets.length > 0) {
            const basketIds = baskets.map(basket => basket.id);
            orders = await Order.findAndCountAll({ where: { basketId: basketIds } });
        }
        return orders
    }

    async getAllOrders(query) {
        const orders = await Order.findAndCountAll({...filtering(query), distinct:true, subQuery: false})
        return orders
    }

    async deleteOrder(id, userId, roles) {
        const order = await Order.scope("basket").findOne({where: {id}})

        if (!order) {
            throw ApiError.notFound()
        }

        allowOwnerOrSuperior(userId, order.basket.userId, roles, [ROLE_MANAGER])

        const deletedOrder = await Order.destroy({where: {id}})
        return deletedOrder
    }
}

module.exports = new OrderService();