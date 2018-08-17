module.exports = (req, res, next) => {
  req.logger.info({ req, event: "request:start" });

  next();
};
