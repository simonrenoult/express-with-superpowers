const { client, describeWithApi, expect } = require("./utils");

describeWithApi("GET /heartbeat", () => {
  it("returns 200", async () => {
    const response = await client.get("/heartbeat");
    expect(response.statusCode).to.equal(200);
  });
});
