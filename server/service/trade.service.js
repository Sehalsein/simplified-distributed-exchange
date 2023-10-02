const { WORKER_SERVICES } = require("../../utils/worker");
const db = require("../db");

const name = WORKER_SERVICES.TRADE_SERVICE;

const getTrades = async () => {
  console.log("Get trades");
  return await db.trade.findMany();
};

module.exports = {
  name,
  actions: {
    getTrades,
  },
};
