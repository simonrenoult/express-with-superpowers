const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const responseTime = require("response-time");
const serveFavicon = require("serve-favicon");
const swaggerUi = require("swagger-ui-express");

const middlewares = require("./shared/middlewares");
const configuration = require("./shared/configuration");
const logger = require("./shared/logger");
const apiRegistrar = require("./shared/api-registrar");

const app = express();

app.set("configuration", configuration);
app.set("logger", logger);

app.use(responseTime());
app.use(middlewares.addRequestId);
app.use(middlewares.addDedicatedLoggerToEachRequest);
app.use(middlewares.logExitingResponse);
app.use(middlewares.logIncomingRequest);
app.use(middlewares.supportBoomInResponse);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(serveFavicon(path.join(__dirname, "..", "public", "favicon.ico")));

const swagger = apiRegistrar.registerAllApi(app);

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swagger));

app.use(middlewares.handleUnknownRoutes);
app.use(middlewares.handleErrors);

module.exports = app;
