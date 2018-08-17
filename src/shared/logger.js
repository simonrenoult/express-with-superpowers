const { createLogger, stdSerializers } = require("bunyan");
const configuration = require("./configuration");

const name = configuration.get("applicationName");
const level = configuration.get("logLevel") || "info";

const logFileForTestEnvironment = "test-stdout.log";

const options = {
  name,
  level,
  serializers: stdSerializers,
  streams: configuration.isTest
    ? [{ path: logFileForTestEnvironment }]
    : [{ stream: process.stdout }]
};

module.exports = createLogger(options);
