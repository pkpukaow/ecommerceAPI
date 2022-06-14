const { Item, Image } = require("../models");
const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");

exports.getAllItems = async (req, res, next) => {
  try {
    const item = await Item.findAll({
      include: { model: Image },
      order: [["id", "DESC"]],
    });

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

    let mainImageUrl = "";
    if (req.files.mainImageUrl) {
      const result = await cloudinary.upload(req.files.mainImageUrl[0].path);
      mainImageUrl = result.secure_url;
    }

    let imageUrl = [];
    if (req.files.imageUrl) {
      if (req.files.imageUrl[0]) {
        const result1 = await cloudinary.upload(req.files.imageUrl[0].path);
        imageUrl.push(result1.secure_url);
      }
      if (req.files.imageUrl[1]) {
        const result2 = await cloudinary.upload(req.files.imageUrl[1].path);
        imageUrl.push(result2.secure_url);
      }
      if (req.files.imageUrl[2]) {
        const result3 = await cloudinary.upload(req.files.imageUrl[2].path);
        imageUrl.push(result3.secure_url);
      }
      if (req.files.imageUrl[3]) {
        const result4 = await cloudinary.upload(req.files.imageUrl[3].path);
        imageUrl.push(result4.secure_url);
      }
    }

    await Image.create({
      imageUrl: mainImageUrl,
      picType: "main",
      itemId: item.id,
    });

    for (let k of imageUrl) {
      await Image.create({
        imageUrl: k,
        itemId: item.id,
      });
    }

    res.json({ item, mainImageUrl, imageUrl });
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      brand,
      animeName,
      charactorName,
      copyRight,
      detail,
      price,
      status,
      releaseDate,
    } = req.body;

    const item = await Item.findOne({ where: { id } });

    if (!item) {
      createError("item not found", 404);
    }

    item.brand = brand || item.brand;
    item.animeName = animeName || item.animeName;
    item.charactorName = charactorName || item.charactorName;
    item.copyRight = copyRight || item.copyRight;
    item.detail = detail || item.detail;
    item.price = price || item.price;
    item.status = status || item.status;
    item.releaseDate = releaseDate || item.releaseDate;

    await item.save();

    res.status(200).json({ item });
  } catch (err) {
    next(err);
  }
};

exports.updateItemPicture = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await Item.findOne({ where: { id } });
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

    const item = await Item.findOne({
      where: { id },
      include: { model: Image },
    });

    res.status(200).json({ item });
  } catch (err) {
    next(err);
  }
};
