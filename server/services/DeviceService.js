const { Device } = require("../models/models");
const uuid = require('uuid')
const path = require('path');
const getPaginationParams = require("../utils/getPaginationParams");

class DeviceService {
    async create(name, price, brandId, typeId, info, img) {
        let filename;
        if (img) {
            filename = uuid.v4() + '.jpg'
        }
            
        let device = await Device.create({name, price, brandId, typeId, img: filename})

        if (filename) {
            img.mv(path.resolve(__dirname, '..', 'static', filename))
        }
        
        if (info) {
            info = JSON.parse(info)
            info.forEach(i => {
                DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                })
                
            });
        }

        device = await Device.scope('infoInclude').findOne({where: {id: device.id}})

        return device

    }

    async getOne(id) {
        const device = await Device.scope('infoInclude').findOne({where: {id}})
        return device
    }

    async getAll(brandId, typeId, limit, page) {
        const limitOffset = getPaginationParams(page, limit)
        let whereClause = {}
        if (brandId) whereClause.brandId = brandId
        if (typeId) whereClause.typeId = typeId

        const devices = await Device.scope('infoInclude').findAndCountAll({
            where: whereClause,
            ...limitOffset
        })

        return devices
    }
}

module.exports = new DeviceService()