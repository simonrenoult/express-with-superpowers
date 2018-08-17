module.exports = (req, res, next) => {
  const logger = req.app.get("logger");
  req.logger = logger.child({ request: req.id });

  next();
};
