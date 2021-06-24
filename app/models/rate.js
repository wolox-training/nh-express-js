module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define(
    'rate',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      rating_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      weet_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[-1, 1]]
        }
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  );
  Rate.associate = models => {
    Rate.belongsTo(models.user, { foreignKey: 'rating_user_id' });
    Rate.belongsTo(models.weet, { foreignKey: 'weet_id' });
  };

  return Rate;
};
