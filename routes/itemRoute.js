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
router.patch("/images/:id", isAdmin, itemController.updateItemPicture);
router.delete("/:id", isAdmin, itemController.deleteItem);
router.post("/:itemId/like", itemController.createLikeItem);
router.delete("/:itemId/like", itemController.deleteLikeItem);

module.exports = router;
