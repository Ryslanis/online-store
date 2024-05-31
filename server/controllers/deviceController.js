const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../errors/ApiError");
const getPaginationParams = require("../utils/getPaginationParams");
const DeviceService = require("../services/DeviceService");

class DeviceController {
    async getAll(req, res, next) {
        try {
            let {brandId, typeId, limit, page} = req.query
            const devices = await DeviceService.getAll(brandId, typeId, limit, page)
            return res.json(devices)
        } catch (error) {
            next(error)
        }
       
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const device = await DeviceService.getOne(id)
            return res.json(device)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            const device = await DeviceService.create(name, price, brandId, typeId, info, img)
            return res.json(device)
        } catch (error) {
            return next(error)
        }
        
    }
}

module.exports = new DeviceController();
