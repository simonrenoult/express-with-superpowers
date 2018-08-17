const { resolve } = require("path");
const { readdirSync } = require("fs");
const pkg = require("../../package.json");
const { mergeSwaggers } = require("./swagger-base")(pkg);

module.exports = { registerAllApi };

function registerAllApi(app) {
  const pathToSrcDirectory = resolve(__dirname, "..");
  const options = { withFileTypes: true };
  const filesAndDirectoriesInSrc = readdirSync(pathToSrcDirectory, options);

  const swaggerList = filesAndDirectoriesInSrc
    .filter(selectApiModulesOnly)
    .map(prependPathToModuleName(pathToSrcDirectory))
    .map(registerApi(app));

  return mergeSwaggers(swaggerList);
}

function selectApiModulesOnly(itemInSrcDirectory) {
  return (
    itemInSrcDirectory.isDirectory() && itemInSrcDirectory.name !== "shared"
  );
}

function prependPathToModuleName(pathToPrepend) {
  return ({ name: moduleName }) => `${pathToPrepend}/${moduleName}`;
}

function registerApi(app) {
  return apiToRegister => {
    const options = { app };
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require(apiToRegister)(options);
  };
}
