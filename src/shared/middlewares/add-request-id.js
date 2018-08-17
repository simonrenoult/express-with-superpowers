const crypto = require("crypto");

module.exports = (req, res, next) => {
  const id = crypto.randomBytes(16).toString("hex");

  req.headers["X-Request-Id"] = id;
  res.set("X-Request-Id", id);
  req.id = id;

  next();
};
