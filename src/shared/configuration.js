require("dotenv").config();

const camelcase = require("camelcase");
const nconf = require("nconf");

const configuration = nconf
  .env({
    lowerCase: true,
    parseValue: true
  })
  .defaults({
    applicationName: "MyApplication",
    logLevel: "info",
    node_env: "development",
    port: 3000
  });

const env = configuration.get("node_env");
const upperCasedEnv = camelcase(env, { pascalCase: true });

const key = `is${upperCasedEnv}`;
configuration[key] = true;

module.exports = configuration;
