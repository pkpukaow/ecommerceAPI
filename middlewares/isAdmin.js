const createError = require("../utils/createError");

module.exports = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      createError("you have no permission", 403);
    }

    next();
  } catch (err) {
    next(err);
  }
};
