'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'user',
      {
        id: {
          primaryKey: true,
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.DataTypes.STRING
        }
      },
      {
        timestamps: true
      }
    ),

  down: queryInterface => queryInterface.dropTable('user')
};
