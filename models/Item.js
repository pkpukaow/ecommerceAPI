module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      charactorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      animeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(["preorder", "instock", "soldout"]),
        defaultValue: "soldout",
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      releaseDate: DataTypes.DATEONLY,
      brand: DataTypes.STRING,
      copyRight: DataTypes.STRING,
      detail: DataTypes.STRING,
      like: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
    }
  );

  Item.associate = (models) => {
    Item.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    Item.hasMany(models.Like, {
      foreignKey: {
        name: "itemId",
        allowNull: false,
      },
    });
    Item.hasMany(models.Image, {
      foreignKey: {
        name: "itemId",
        allowNull: false,
      },
    });
    Item.hasMany(models.OrderItem, {
      foreignKey: {
        name: "itemId",
        allowNull: false,
      },
    });
    Item.hasMany(models.Comment, {
      foreignKey: {
        name: "itemId",
        allowNull: false,
      },
    });
  };

  return Item;
};
