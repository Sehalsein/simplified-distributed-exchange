const { ORDER_TYPE } = require("../../utils/order");
const OrderService = require("../service/order.service");
const { peer } = require("../client");

const [orderType, price, quantity, user] = process.argv.slice(2);

async function run() {
  console.log("submitting order");
  const orderService = new OrderService(peer);
  await orderService
    .submitOrder(
      {
        type: orderType === ORDER_TYPE.BUY ? ORDER_TYPE.BUY : ORDER_TYPE.SELL,
        price: Number(price),
        quantity: Number(quantity),
      },
      user
    )
    .then(console.log);
}

run();
