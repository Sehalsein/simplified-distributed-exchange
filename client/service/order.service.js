const { WORKER_SERVICES } = require("../../utils/worker");
const { promisify } = require("../../utils/promise");
const { hashString } = require("../../utils/hash");
const db = require("../db");

class OrderService {
  name = WORKER_SERVICES.ORDER_SERVICE;

  constructor(peer) {
    this.request = promisify(peer.request.bind(peer));
  }

  /**
   * Submit order to the order service
   * @param {Object} data - The order data
   * @param {string} data.type - The type of order. either "buy" or "sell"
   * @param {number} data.price - The price of the order
   * @param {number} data.quantity - The quantity of the order
   * @returns {Promise<Object>} The order data
   */
  async submitOrder(data, userId) {
    // TODO: Add validation for data
    data.timestamp = Date.now();
    data.userId = userId;
    data.id = hashString(`${userId}-${data.timestamp}`);

    // Updating local and distributed order books
    // Using Promise.all to run both operations in parallel
    await Promise.all([
      await db.order.create(data),
      await this.request(this.name, {
        action: "distributeOrder",
        args: [data],
      }),
    ]);

    this.syncOrders().catch(console.error);

    return {
      data: {
        id: data.id,
      },
      message: "Order placed successfully",
    };
  }

  async syncOrders() {
    const distributedOrders = await this.request(this.name, {
      action: "getOrders",
    });

    // const result = mergeOrders(localOrders, distributedOrders);
    await db.order.set(distributedOrders);
    return {
      data: {
        count: distributedOrders.length,
      },
      message: "Orders synced successfully",
    };
  }

  async getOrders() {
    return db.order.findMany();
  }
}

module.exports = OrderService;

// Helper
function mergeOrders(arr1, arr2) {
  const merged = [...arr1, ...arr2];

  const unique = new Set();

  const result = merged.filter((item) => {
    if (!unique.has(item.id)) {
      unique.add(item.id);
      return true;
    }
    return false;
  });

  result.sort((a, b) => a.timestamp - b.timestamp);

  return result;
}
