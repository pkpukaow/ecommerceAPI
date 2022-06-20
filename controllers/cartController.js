const { Order, OrderItem, User, sequelize } = require("../models");
const cloudinary = require("../utils/cloudinary");

exports.getAllOrder = async (req, res, next) => {
  try {
    const order = await Order.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
      ],
    });

    res.json({ order });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.user;
    const { totalPrice, numberOfItem, customerAddress, arrayOfItems } =
      req.body;

    let image;

    if (req.file) {
      const result = await cloudinary.upload(req.file.path);
      image = result.secure_url;
    }

    const order = await Order.create({
      totalPrice,
      numberOfItem,
      customerAddress,
      userId: id,
      slipUrl: image,
    });

    if (Array.isArray(arrayOfItems)) {
      for (let item of arrayOfItems) {
        item = JSON.parse(item);
        console.log(item);
        await OrderItem.create({
          orderId: order.id,
          pricePerItem: item.price,
          amountItem: item.amount,
          itemId: item.id,
        });
      }
    } else {
      item = JSON.parse(arrayOfItems);
      await OrderItem.create(
        {
          orderId: order.id,
          pricePerItem: item.price,
          amountItem: item.amount,
          itemId: item.id,
        },
        { transaction: t }
      );
    }

    await t.commit();
    res.json({ order });
  } catch (err) {
    next(err);
    await t.rollback();
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.user;

    const order = await Order.findAll({
      where: { userId: id },
      order: [["id", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
      ],
    });

    res.json({ order });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    console.log(id);
    const order = await Order.findOne({
      where: { id },
    });

    await order.update({
      status,
    });

    res.json({ order });
  } catch (err) {
    next(err);
  }
};
