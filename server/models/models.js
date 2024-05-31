const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const { ORDER_ADDRESS_MAX_LENGTH, ORDER_COMMENT_MAX_LENGTH } = require('../constants/constrains')


const User = sequelize.define('user', {
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
})

const UserRole = sequelize.define('user_role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    roleId: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
}, 
{
    timestamps: false,
})

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, defaultValue: "USER"},
}, 
{
    timestamps: false
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.STRING, allowNull: false}
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Token = sequelize.define('token', {
    refreshToken: {type: DataTypes.STRING(350), allowNull: false}
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    paid: {type: DataTypes.BOOLEAN, defaultValue: false},
    delivered: {type: DataTypes.BOOLEAN, defaultValue: false},
    address: {type: DataTypes.STRING(ORDER_ADDRESS_MAX_LENGTH), allowNull: false},
    comment: {type: DataTypes.TEXT, allowNull: false, validate: {
        len: {
          args: [0, ORDER_COMMENT_MAX_LENGTH],
          msg: "Comment must be less than 500 characters"
        }}
    }
})


User.belongsToMany(Role,{through: UserRole})
Role.belongsToMany(User, {through: UserRole})

User.hasOne(Basket, {foreignKey: {name: 'userId', allowNull: false}})
Basket.belongsTo(User, {foreignKey: {name: 'userId', allowNull: false}})

User.hasMany(Rating, {foreignKey: {name: 'userId', allowNull: false}})
Rating.belongsTo(User, {foreignKey: {name: 'userId', allowNull: false}})

Basket.hasMany(BasketDevice, {foreignKey: {name: 'basketId', allowNull: false}})
BasketDevice.belongsTo(Basket, {foreignKey: {name: 'basketId', allowNull: false}})

Device.hasMany(DeviceInfo, {as: 'info', foreignKey: {name: 'deviceId', allowNull: false}})
DeviceInfo.belongsTo(Device, {foreignKey: {name: 'deviceId', allowNull: false}})

Device.hasMany(Rating, {foreignKey: {name: 'deviceId', allowNull: false}})
Rating.belongsTo(Device, {foreignKey: {name: 'deviceId', allowNull: false}})

Device.hasMany(BasketDevice, {foreignKey: {name: 'deviceId', allowNull: false}})
BasketDevice.belongsTo(Device, {foreignKey: {name: 'deviceId', allowNull: false}})

Type.hasMany(Device, {foreignKey: {name: 'typeId', allowNull: false}})
Device.belongsTo(Type, {foreignKey: {name: 'typeId', allowNull: false}})

Brand.hasMany(Device, {foreignKey: {name: 'brandId', allowNull: false}})
Device.belongsTo(Brand, {foreignKey: {name: 'brandId', allowNull: false}})

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

User.hasOne(Token, {foreignKey: {name: 'userId', allowNull: false}})
Token.belongsTo(User, {foreignKey: {name: 'userId', allowNull: false}})

Basket.hasMany(Order, {foreignKey: {name: 'basketId', allowNull: false}})
Order.belongsTo(Basket, {foreignKey: {name: 'basketId', allowNull: false}})


User.addScope('rolesInclude', {
    include: {
      model: Role,
      through: {
        attributes: []
      },
    }
  });

Device.addScope('infoInclude', {
include: {
    model: DeviceInfo,
    as: 'info'
}
});


Basket.addScope('basketDevices', {
    include: {
        model: BasketDevice,
        as: 'basket_devices'
    }
    });


Order.addScope("basket", {
    include: {
        model: Basket,
        as: 'basket'
    }
})

Order.addScope("all", {
    include: {
        model: Basket,
        as: 'basket',
        include: {
            model: User,
            as: 'user',
            attributes: { exclude: ['password']},
            include: {
                model: Role,
                as: 'roles',
                through: {
                    attributes: []
                  },
            }
        }
    }
})


module.exports = {
    User,
    UserRole,
    Role,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo,
    Token,
    Order
}

