const OrderService = require("../service/order.service");
const { peer } = require("../client");

async function run() {
  console.log("fetching order");
  const orderService = new OrderService(peer);

  await orderService.syncOrders().then(console.log).catch(console.error);

  const result = await orderService.getOrders();

  console.log(JSON.stringify(result, null, 2));
}

run();
