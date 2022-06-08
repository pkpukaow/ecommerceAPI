const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const { User } = require("../models");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username: username },
    });
    if (!user) {
      createError("invalid credential", 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      createError("invalid credential", 400);
    }

    const token = genToken({ id: user.id });
    res.status(201).json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      address,
      confirmPassword,
      phoneNumber,
    } = req.body;

    if (!firstName) {
      createError("firstname is required", 400);
    }
    if (!lastName) {
      createError("lastname is required", 400);
    }
    if (!username) {
      createError("username is required", 400);
    }
    if (!email) {
      createError("email is required", 400);
    }
    if (!password) {
      createError("password is required", 400);
    }
    if (password !== confirmPassword) {
      createError("password is not match", 400);
    }
    if (!phoneNumber) {
      createError("phoneNumber is required", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      address,
      phoneNumber,
      password: hashedPassword,
    });
    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({ role: req.user.role });
  } catch (err) {
    next(err);
  }
};
exports.getUser = async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      createError("user not found", 404);
    }
    let image;
    if (req.file) {
      if (user.profilePic) {
        const splited = post.image.split("/");
        const publicId = splited[splited.length - 1].split(".")[0];
        await cloudinary.destroy(publicId);
      }
      const result = await cloudinary.upload(req.file.path);
      image = result.secure_url;
    }
    await user.update({
      firstName,
      lastName,
      email,
      phoneNumber,
      profilePic: image,
    });
    res.status(200).json({ message: " update success" });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.updateUserPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      createError("user not found", 404);
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      createError("old password is not match", 400);
    }
    if (newPassword !== confirmPassword) {
      createError("password is not match", 400);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    await user.update({
      password: hashedPassword,
    });
    res.status(200).json({ message: "update success" });
  } catch (err) {
    next(err);
  }
};
