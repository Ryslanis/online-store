'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'users',
        'isActivatedViaEmail',
        {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'users',
        'activationLink',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn(
        'users',
        'isActivatedViaEmail',
        { transaction },
      );
      await queryInterface.removeColumn(
        'users',
        'activationLink',
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
