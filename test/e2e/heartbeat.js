const { expect } = require("chai");
const request = require("got");

describe("GET /hearbeat", () => {
  it("returns {isAlive: true}", async function() {
    // when
    const { body } = await request.get("/heartbeat", this.requestOptions);

    // then
    expect(body).to.deep.equal({ isAlive: true });
  });
});
