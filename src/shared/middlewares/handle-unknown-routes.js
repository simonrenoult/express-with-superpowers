const boom = require("boom");
const httpStatus = require("http-status");

module.exports = (req, res) => {
  const msg = `Resource '${req.method} ${req.url}' was not found.`;
  res.status(httpStatus.NOT_FOUND).send(boom.notFound(msg));
};
