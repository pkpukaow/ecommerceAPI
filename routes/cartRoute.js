const express = require("express");
const upload = require("../middlewares/upload");

const isAdmin = require("../middlewares/isAdmin");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/", isAdmin, cartController.getAllOrder);
router.post(
  "/order",
  upload.single("slipUrl"),
  isAdmin,
  cartController.createOrder
);

module.exports = router;
