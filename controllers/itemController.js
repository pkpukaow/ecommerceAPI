const { Item } = require("../models");
const createError = require("../utils/createError");

exports.getAllItems = async (req, res, next) => {
  try {
    const item = await Item.findAll();

    res.json({ item });
  } catch (error) {}
};

exports.createItem = async (req, res, next) => {
  try {
    const {
      charactorName,
      animeName,
      status,
      price,
      releaseDate,
      brand,
      copyRight,
      detail,
    } = req.body;

    if (!charactorName) {
      createError("charactorName is required", 400);
    }

    if (!animeName) {
      createError("animeName is required", 400);
    }

    if (!price) {
      createError("price is required", 400);
    }

    if (!releaseDate) {
      createError("releaseDate is required", 400);
    }

    if (!brand) {
      createError("brand is required", 400);
    }

    if (!copyRight) {
      createError("copyRight is required", 400);
    }

    if (!detail) {
      createError("detail is required", 400);
    }

    const item = await Item.create({
      charactorName,
      animeName,
      status,
      price,
      releaseDate,
      brand,
      copyRight,
      detail,
      userId: req.user.id,
    });

    res.json({ item });
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findOne({
      where: { id },
    });

    if (!item) {
      createError("item not found", 404);
    }

    await Item.destroy({ where: { id } });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

exports.createLikeItem = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.deleteLikeItem = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await Item.findOne({ where: { id } });

    res.status(200).json({ item });
  } catch (err) {
    next(err);
  }
};
