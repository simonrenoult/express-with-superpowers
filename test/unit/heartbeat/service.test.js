const { expect } = require("chai");
const service = require("../../../src/heartbeat/service");

describe(".getHeartbeatStatus()", () => {
  it("returns {isAlive: true}", () => {
    // when
    const { isAlive } = service.getHeartbeatStatus();

    // then
    expect(isAlive).to.equal(true);
  });
});
