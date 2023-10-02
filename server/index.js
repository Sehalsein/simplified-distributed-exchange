const { WORKER_SERVICES } = require("../utils/worker");
const { handleRoutes } = require("./router");
const { link, service } = require("./server");

setInterval(function () {
  link.announce(WORKER_SERVICES.ORDER_SERVICE, service.port, {});
  link.announce(WORKER_SERVICES.TRADE_SERVICE, service.port, {});
}, 1000);

service.on("request", handleRoutes);
