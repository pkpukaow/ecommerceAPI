module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      numberOfItem: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      slipUrl: DataTypes.STRING,
      customerAddress: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("pending", "success", "failed"),
        defaultValue: "pending",
      },
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

    Order.hasMany(models.OrderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
    });
  };

  return Order;
};
