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
router.patch("/password", authenticate, authController.updateUserPassword);

router.patch(
  "/update",
  authenticate,
  upload.single("profilePic"),
  authController.updateUser
);
router.get("/", itemController.getAllItems);

module.exports = router;
