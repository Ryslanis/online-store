require('dotenv').config()
const bcrypt = require('bcrypt')
const roles = require('../constants/roles');
const { Brand, Type, Device, TypeBrand, DeviceInfo, Basket, UserRole, Role, User, BasketDevice, Order, Rating, Token } = require('../models/models');
const sequelize = require('../db')


console.log(process.env)

async function createRolesAndUsers() {
  await Role.bulkCreate(Object.values(roles).map(role => ({name: role})))

  const hashPassword = await bcrypt.hash('12345!Qwerty', 5)
  const superAdminUser = await User.create({
    email: 'test@gmail.com',
    password: hashPassword,
  });

  const superAdminRole = await Role.findOne({ where: { name: roles.ROLE_ADMIN } });
  const customerRole = await Role.findOne({ where: { name: roles.ROLE_CUSTOMER } });
  await superAdminUser.addRole(superAdminRole);
  await superAdminUser.addRole(customerRole);
  await Basket.create({userId: superAdminUser.id})
}

async function addSomeDevices() {
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
}


async function up () {
  

  await createRolesAndUsers()
  await addSomeDevices()
}

async function down () {
  await UserRole.drop({cascade: true, truncate: true })
  await Role.drop({cascade: true, truncate: true })
  await User.drop({cascade: true, truncate: true })
  await Brand.drop({cascade: true, truncate: true })
  await Type.drop({cascade: true, truncate: true })
  await TypeBrand.drop({cascade: true, truncate: true })
  await Device.drop({cascade: true,truncate: true})
  await DeviceInfo.drop({cascade: true,truncate: true})
  await BasketDevice.drop({cascade: true,truncate: true})
  await Order.drop({cascade: true,truncate: true})
  await Rating.drop({cascade: true,truncate: true})
  await Token.drop({cascade: true,truncate: true})
  await Basket.drop({cascade: true,truncate: true})
}



async function start(arg) {
  await sequelize.authenticate()
  await sequelize.sync()

  if (arg === 'up') {
    up()
  }
  
  if (arg === 'down') {
    down()
  }
}

arg = process.argv[2]
if (arg) {
  start(arg)
}

