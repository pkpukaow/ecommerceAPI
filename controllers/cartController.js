const { Cart, Item, Image } = require("../models");

exports.getAllCartItem = async (req, res, next) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({ where: { id } });
    res.json({ cart });
  } catch (err) {
    next(err);
  }
};

exports.addCartItem = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
