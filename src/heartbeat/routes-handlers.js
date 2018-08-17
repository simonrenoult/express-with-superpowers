const service = require("./service");

module.exports = {
  get(req, res) {
    const heartbeat = service.getHeartbeatStatus();
    res.send(heartbeat);
  }
};
