const express = require("express");

const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("/order", cartController.createOrder);
router.post("/orderItem", cartController.createOrderItem);

module.exports = router;
