const validator = require("validator");
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

    const hashedPassword = await bcrypt.hash(password, 12);
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

exports.getRole = async (req, res, next) => {
  try {
    res.status(200).json({ role: req.user.role });
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
  } catch (err) {
    next(err);
  }
};
exports.updateUserPic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {} = req.file;

    const user = await User.findOne({ where: { id } });
  } catch (err) {
    next(err);
  }
};
