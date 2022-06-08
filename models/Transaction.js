module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      amountItem: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM("pending", "success", "failed"),
        defaultValue: "pending",
      },
    },
    {
      underscored: true,
    }
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
    });
  };

  return Transaction;
};
