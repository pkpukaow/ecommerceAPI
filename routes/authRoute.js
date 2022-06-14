const express = require("express");

const authController = require("../controllers/authController");
const itemController = require("../controllers/itemController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", itemController.getAllItems);
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/me", authenticate, authController.getMe);
router.get("/user", authenticate, authController.getUser);
router.patch("/password", authenticate, authController.updateUserPassword);
router.patch(
  "/update",
  authenticate,
  upload.single("profilePic"),
  authController.updateUser
);

module.exports = router;
