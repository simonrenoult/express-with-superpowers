const routersHandlers = require("./routes-handlers");
const swagger = require("./swagger");

module.exports = ({ app }) => {
  app.get("/heartbeat", routersHandlers.get);

  return swagger;
};
