const { WORKER_SERVICES } = require("../../utils/worker");
const { promisify } = require("../../utils/promise");
const db = require("../db");

class TradeService {
  name = WORKER_SERVICES.TRADE_SERVICE;

  constructor(peer) {
    this.request = promisify(peer.request.bind(peer));
  }

  async getTrades() {
    return await this.request(this.name, {
      action: "getTrades",
    });
  }
}

module.exports = TradeService;
