const camelCase = require("camelcase");
const requireDirectory = require("require-directory");

module.exports = requireDirectory(module, {
  rename: camelCase
});
