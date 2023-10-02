const { peer } = require("../client");
const TradeService = require("../service/trade.service");

async function run() {
  console.log("fetching trades");
  const tradeService = new TradeService(peer);
  const result = await tradeService.getTrades();

  console.log(JSON.stringify(result, null, 2));
}

run();
