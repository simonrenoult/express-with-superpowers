const { after, before, describe } = require("mocha");
const { createServer } = require("http");
const { expect } = require("chai");
const { extend } = require("got");

const server = require("../../src/application");

const configuration = server.get("configuration");
const port = configuration.get("port");
const client = extend({ baseUrl: `http://localhost:${port}` });

function describeWithApi(describeTitle, callback) {
  let api;

  before(done => {
    api = createServer(server);
    api.listen(port, done);
  });

  after(done => {
    api.close(done);
  });

  describe(describeTitle, callback);
}

module.exports = { client, describeWithApi, expect };
