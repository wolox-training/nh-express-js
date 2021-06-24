'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.createTable('rate', {
        id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          autoIncrement: true
        },
        rating_user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'user'
            },
            key: 'id'
          },
          allowNull: false
        },
        weet_id: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'weet'
            },
            key: 'id'
          },
          allowNull: false
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      }),
      queryInterface.addColumn('user', 'position', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      })
    ]),
  down: queryInterface =>
    Promise.all([queryInterface.dropTable('rate'), queryInterface.removeColumn('user', 'position')])
};
