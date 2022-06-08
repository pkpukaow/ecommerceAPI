const express = require("express");

const authController = require("../controllers/authController");
const itemController = require("../controllers/itemController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/me", authenticate, authController.getMe);
router.get("/role", authenticate, authController.getRole);
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.patch("/:id", authController.updateUser);
router.patch("/:id", upload.single("image"), authController.updateUserPic);
router.get("/", itemController.getAllItems);

module.exports = router;
