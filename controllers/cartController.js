const { Order, OrderItem } = require("../models");
const cloudinary = require("../utils/cloudinary");

exports.getAllOrder = async (req, res, next) => {
  try {
    const order = await Order.findAll({
      order: [["id", "DESC"]],
    });

    res.json({ order });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
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

    res.json({ order });
  } catch (err) {
    next(err);
  }
};
