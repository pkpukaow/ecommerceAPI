module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      imageUrl: DataTypes.STRING,
      picType: {
        type: DataTypes.ENUM("main", "alter", "thumbnail"),
        defaultValue: "alter",
      },
    },
    {
      underscored: true,
    }
  );

  Image.associate = (models) => {
    Image.belongsTo(models.Item, {
      foreignKey: {
        name: "itemId",
        allowNull: false,
      },
    });
  };

  return Image;
};
