const express = require("express");
const upload = require("../middlewares/upload");

const itemController = require("../controllers/itemController");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.get("/:id", itemController.getItemById);
router.post(
  "/",
  upload.fields([
    { name: "mainImageUrl", maxCount: 1 },
    { name: "imageUrl", maxCount: 4 },
  ]),
  isAdmin,
  itemController.createItem
);
router.patch("/:id", isAdmin, itemController.updateItem);
router.delete("/:id", isAdmin, itemController.deleteItem);

module.exports = router;
