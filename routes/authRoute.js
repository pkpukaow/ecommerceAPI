const express = require("express");

const authController = require("../controllers/authController");
const itemController = require("../controllers/itemController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/me", authenticate, authController.getMe);
router.get("/user", authenticate, authController.getUser);
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.patch("/:id", upload.single("image"), authController.updateUser);
router.patch("/password/:id", authController.updateUserPassword);
router.get("/", itemController.getAllItems);

module.exports = router;
