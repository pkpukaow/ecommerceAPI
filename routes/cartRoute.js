const express = require("express");
const upload = require("../middlewares/upload");

const isAdmin = require("../middlewares/isAdmin");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/", isAdmin, cartController.getAllOrder);
router.get("/me", cartController.getOrderById);
router.post("/order", upload.single("slipUrl"), cartController.createOrder);
router.patch("/", isAdmin, cartController.updateOrderStatus);

module.exports = router;
