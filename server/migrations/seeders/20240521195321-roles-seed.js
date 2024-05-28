'use strict';
const bcrypt = require('bcrypt')

const { User, Role, UserRole } = require('../../models/models');
const constants = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Role.bulkCreate([
      { name: constants.ROLE_SUPER_ADMIN },
      { name: constants.ROLE_ADMIN },
      { name: constants.ROLE_MODERATOR },
      { name: constants.ROLE_CUSTOMER },

    ]);

    const hashPassword = await bcrypt.hash('12345!Qwerty', 5)
    const superAdminUser = await User.create({
      email: 'test@gmail.com',
      password: hashPassword,
    });

    const superAdminRole = await Role.findOne({ where: { name: constants.ROLE_SUPER_ADMIN } });
    await superAdminUser.addRole(superAdminRole);

  },

  async down (queryInterface, Sequelize) {
    await UserRole.truncate({ cascade: true })
    await Role.truncate({ cascade: true })
    await User.truncate({cascade: true})
  }
};
