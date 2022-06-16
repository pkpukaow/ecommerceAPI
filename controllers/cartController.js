const { Order, OrderItem } = require("../models");

exports.createOrder = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { totalPrice, numberOfItem, arrayOfItems } = req.body;

    const order = await Order.create({ totalPrice, numberOfItem, userId: id });

    for (let item of arrayOfItems) {
      await OrderItem.create({
        orderId: order.id,
        pricePerItem: item.pricePerItem,
        amountItem: item.amountItem,
        itemId: item.itemId,
      });
    }

    res.json({ order, arrayOfItems });
  } catch (err) {
    next(err);
  }
};

exports.createOrderItem = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
