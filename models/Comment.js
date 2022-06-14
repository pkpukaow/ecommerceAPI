module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      Comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });

    Comment.belongsTo(models.Item, {
      foreignKey: {
        name: "itemId",
        allowNull: false,
      },
    });
  };

  return Comment;
};
