const createDBInstance = () => {
  const DB_DATA = {};

  // Technically these are not async functions
  // Adding async to make it consistent with other db functions
  return {
    order: {
      findMany: async () => {
        return DB_DATA.order || [];
      },
      findFirst: async (id) => {
        const orders = DB_DATA.order || [];
        return orders.find((order) => order.id === id);
      },
      create: async (data) => {
        DB_DATA.order = DB_DATA.order || [];
        DB_DATA.order.push(data);
        return data;
      },
      update: async (id, data) => {
        const orders = DB_DATA.order || [];
        const order = orders.find((order) => order.id === id);

        if (order) {
          Object.assign(order, data);
          return true;
        }
        return false;
      },
      delete: async (id) => {
        DB_DATA.order = DB_DATA.order.filter((order) => order.id !== id);
        return true;
      },
      set: async (data) => {
        DB_DATA.order = data || DB_DATA.order || [];
        return true;
      },
    },
    trade: {
      findMany: async () => {
        return DB_DATA.trade || [];
      },
      create: async (data) => {
        DB_DATA.trade = DB_DATA.trade || [];
        DB_DATA.trade.push(data);
        return data;
      },
      set: async (data) => {
        DB_DATA.trade = data || DB_DATA.trade || [];
        return true;
      },
    },
  };
};

module.exports = {
  createDBInstance,
};
