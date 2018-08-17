module.exports = (req, res, next) => {
  const listener = {
    finish() {
      cleanup();
      req.logger.info({ req, res, event: "request:finish" });
    },
    close() {
      cleanup();
      req.logger.info({ req, res, event: "request:closed-by-client" });
    },
    error(err) {
      cleanup();
      req.logger.info({ err, req, res, event: "request:error" });
    }
  };

  res.on("finish", listener.finish);
  res.on("close", listener.close);
  res.on("error", listener.error);

  next();

  function cleanup() {
    res.removeListener("finish", listener.finish);
    res.removeListener("close", listener.close);
    res.removeListener("error", listener.error);
  }
};
