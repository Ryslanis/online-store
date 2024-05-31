const { Basket, User, Role } = require("./models");

function getWhereClause(queries) {
    const { personId, email, role} = queries;

    let whereClause = {};
    if (personId !== undefined) {
        whereClause['$basket.user.id$'] = personId;
    }
    if (email !== undefined) {
        whereClause['$basket.user.email$'] = email;
    }
    if (role !== undefined) {
        whereClause['$basket.user.roles.name$'] = role.toUpperCase();
    }

    return whereClause
}


function getOrderClause(queries) {
    const {sortField = 'data', sortOrder = "ASC"} = queries
    
    let orderClause = [];

    switch (sortField.toLowerCase()) {
        case 'email':
            orderClause.push([Basket, User, 'email', sortOrder]);
            break;
        case 'role':
            orderClause.push([Basket, User, Role, 'name', sortOrder]);
            break;
        case 'data':
            orderClause.push(['createdAt', sortOrder]);
            break;
        case 'address':
            orderClause.push(['address', sortOrder]);
            break;
        case 'comment':
            orderClause.push(['comment', sortOrder]);
            break;
    }
  
    return orderClause
}


module.exports = function (queries) {
    const whereClause = getWhereClause(queries)
    const orderClause = getOrderClause(queries)
    console.log(whereClause, orderClause)
    
    return {
        where: whereClause,
        order: orderClause,
        include: {
            model: Basket,
            as: 'basket',
            include: {
                model: User,
                as: 'user',
                attributes: { exclude: ['password'] },
                include: {
                    model: Role,
                    as: 'roles',
                    through: {
                        attributes: []
                      },
                },
            }
        },
        // * 2 temporary fix as limit and offset don't work with included correctly...
        limit: (Number(queries.limit) * 2) || 2 * 2,
        offset: Number(queries.offset) * 2 || 0,
    };
};