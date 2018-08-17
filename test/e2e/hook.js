const { createServer } = require("http");
const server = require("../../src/application");

let api;

before(function(done) {
  const configuration = server.get("configuration");
  const port = configuration.get("port");

  api = createServer(server);

  const serverOptions = { port, host: "localhost" };
  this.requestOptions = { json: true, ...serverOptions };

  api.listen(serverOptions, done);
});

after(done => {
  api.close(done);
});
