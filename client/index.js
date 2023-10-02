const { v4: uuidv4 } = require("uuid");

const { ORDER_TYPE } = require("../utils/order");
const OrderService = require("./service/order.service");
const { peer } = require("./client");

const USER_ID = uuidv4();

async function run() {
  const orderService = new OrderService(peer);

  // Sync orders on startup
  await orderService.syncOrders().then(console.log).catch(console.error);

  // Sync orders every 10 seconds
  setInterval(
    async () =>
      await orderService.syncOrders().then(console.log).catch(console.error),
    10000
  );

  await orderService
    .submitOrder(
      {
        type: ORDER_TYPE.SELL,
        price: getRandomNumber(100, 200),
        quantity: getRandomNumber(1, 10),
      },
      USER_ID
    )
    .then(console.log);
}

run();

// Helpers
function getRandomNumber(min, max) {
  return Math.round(Math.pow(Math.random(), 2) * (max - min) + min);
}
