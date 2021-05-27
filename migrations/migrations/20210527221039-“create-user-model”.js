'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('user', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    }),

  down: queryInterface => queryInterface.dropTable('user')
};
