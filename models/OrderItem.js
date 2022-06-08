module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      amountItem: DataTypes.INTEGER,
      pricePerItem: DataTypes.INTEGER,
    },
    {
      underscored: true,
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Item, {
      foreignKey: {
        name: "itemId",
        allowNull: false,
      },
    });

    OrderItem.belongsTo(models.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
    });
  };

  return OrderItem;
};
