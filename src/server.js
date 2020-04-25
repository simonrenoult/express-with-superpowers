const Path = require("path");
const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");

class Server {
  constructor(host, port) {
    this.server = new Hapi.Server({
      host,
      port,
      routes: {
        files: {
          relativeTo: Path.join(__dirname, "public")
        }
      }
    });
  }

  async start() {
    await this.server.register(Vision);
    await this.server.register(Inert);
    this.server.route([
      {
        method: "GET",
        path: "/{param*}",
        handler: {
          directory: {
            path: ".",
            redirectToSlash: true,
            index: true
          }
        }
      }
    ]);
    await this.server.start();
    console.log("Server running on %s", this.server.info.uri);
  }
}

module.exports = Server;
