const { createServer } = require("http");
const { writeFile } = require("fs");

const server = require("../src/application");

const configuration = server.get("configuration");
const logger = server.get("logger");
const port = configuration.get("port");
const env = configuration.get("node_env");

const api = createServer(server);

api.listen(port);

api.on("error", onError);
api.on("listening", onListening);
api.on("close", onClosing);

process.on("SIGINT", () => {
  logger.info({ event: "server:stopping-because-sigint" });
  process.exit(0);
});

function onError(error) {
  if (error.code === "EADDRINUSE") {
    logger.error(`Port ${port} is already in use.`);
    process.exit(1);
    return;
  }

  throw error;
}

function onListening() {
  const { address } = api.address();
  const host = address + port;

  logger.info({
    address,
    env,
    port,
    host,
    event: "server:listening"
  });

  createPidFile();
}

function createPidFile() {
  const pidFileLocation = `${process.cwd()}/program.pid`;
  writeFile(pidFileLocation, process.pid, "utf8", err => {
    if (err) {
      logger.error({ event: "server:error-when-creating-pid-file" });
      process.exit(1);
    }
  });
}

function onClosing() {
  logger.error({ event: "server:closed-by-client" });
}
