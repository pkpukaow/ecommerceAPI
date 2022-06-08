module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      numberOfItem: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
    },
    {
      underscored: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });

    Order.hasOne(models.Transaction, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
    });
  };

  return Order;
};
