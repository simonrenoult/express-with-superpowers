const { readFile } = require("fs");
const server = require("../src/application");

const logger = server.get("logger");
const pidFileLocation = `${process.cwd()}/program.pid`;

readFile(pidFileLocation, "utf8", (err, pid) => {
  if (err) {
    logger.error({ event: "server:error-when-stopping-process" });
    process.exit(1);
  }

  logger.info({ event: "server:stopping" });
  process.kill(pid, "SIGINT");
});
