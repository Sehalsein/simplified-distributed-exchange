const config = require("../configuration/config");
const { createServer } = require("../lib/grenache/server");

const { link, peer, service } = createServer(config.GRENACHE.URL);

module.exports = {
  link,
  peer,
  service,
};
