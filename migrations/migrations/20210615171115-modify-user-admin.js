'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('user', 'type', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user'
      })
    ]);
  },

  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('user', 'type')]);
  }
};
