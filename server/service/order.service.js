const { WORKER_SERVICES } = require("../../utils/worker");
const { ORDER_TYPE } = require("../../utils/order");
const db = require("../db");

const name = WORKER_SERVICES.ORDER_SERVICE;

const matchOrder = async (data) => {
  console.log("Match order", data);
  const currentOrder = { ...data };

  const orders = await db.order.findMany().then((orders) => {
    return orders.filter((order) => {
      return order.type !== currentOrder.type;
    });
  });

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    const isMatch =
      currentOrder.type === ORDER_TYPE.BUY
        ? order.price <= currentOrder.price
        : order.price >= currentOrder.price;

    if (isMatch) {
      const quantity = Math.min(order.quantity, currentOrder.quantity);

      const trade = {
        price: order.price,
        quantity: quantity,
        buyer: order.userId,
        seller: currentOrder.userId,
        timestamp: Date.now(),
      };

      currentOrder.quantity -= quantity;
      order.quantity -= quantity;

      if (order.quantity === 0) {
        await db.order.delete(order.id);
      } else {
        await db.order.update(order.id, order);
      }

      if (currentOrder.quantity === 0) {
        await db.order.delete(currentOrder.id);
      } else {
        await db.order.update(currentOrder.id, currentOrder);
      }

      await db.trade.create(trade);
    }
  }
};

const distributeOrder = async (data) => {
  console.log("Distribute order");
  // TODO: Add validation for data
  await db.order.create(data);

  // Match order
  await matchOrder(data);

  return {
    data: {
      id: data.id,
    },
    message: "Order placed successfully",
  };
};

const getOrders = async () => {
  console.log("Get orders");
  return await db.order.findMany();
};

const getTrades = async () => {
  console.log("Get trades");
  return await db.trade.findMany();
};

module.exports = {
  name,
  actions: {
    distributeOrder,
    getOrders,
    getTrades,
  },
};
