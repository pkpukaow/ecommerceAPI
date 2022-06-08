const express = require("express");

const itemController = require("../controllers/itemController");

const router = express.Router();

router.get("/:id", itemController.getItemById);
router.post("/", itemController.createItem);
router.patch("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);
router.post("/:itemId/like", itemController.createLikeItem);
router.delete("/:itemId/like", itemController.deleteLikeItem);

module.exports = router;
