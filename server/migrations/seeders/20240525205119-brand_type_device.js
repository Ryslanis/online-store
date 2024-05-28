'use strict';

const { Brand, Type, Device, TypeBrand, DeviceInfo } = require('../../models/models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Brand.create({name: 'Samsung'})
    await Brand.create({name: 'LG'})
    await Brand.create({name: 'Nokia'})
    await Brand.create({name: 'Apple'})
    await Brand.create({name: 'Siemens'})

    await Type.create({name: 'Phone'})
    await Type.create({name: 'TV'})
    await Type.create({name: 'Earphones'})
    await Type.create({name: 'Coffe machine'})

    await Device.create({name: 'Samsung A33', price: 10010, img: 'samsungA33.webp', brandId: 1, typeId:1})
    await TypeBrand.create({typeId:1, brandId: 1})
    await Device.create({name: 'iPhone15', price: 40000, img: 'Iphone.webp', brandId: 1, typeId:1})
    await Device.create({name: 'Siemens TE65', price: 123, img: 'coffee.webp', brandId: 5, typeId: 4})
    await TypeBrand.create({typeId:4, brandId: 5})


    await DeviceInfo.create({title: 'RAM', description: "8GB", deviceId: 1})
    await DeviceInfo.create({title: 'OS', description: "Android", deviceId: 1})
    await DeviceInfo.create({title: 'OS', description: "iOS", deviceId: 2})
    await DeviceInfo.create({title: 'SIM count', description: "2", deviceId: 2})
    await DeviceInfo.create({title: 'Seria', description: "EQ6", deviceId: 3})
  },

  async down (queryInterface, Sequelize) {
    await Brand.drop({cascade: true, truncate: true })
    await Type.drop({cascade: true, truncate: true })
    await TypeBrand.drop({cascade: true, truncate: true })
    await Device.drop({cascade: true,truncate: true})
    await DeviceInfo.drop({cascade: true,truncate: true})
  }
};
