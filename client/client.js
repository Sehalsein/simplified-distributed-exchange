const config = require("../configuration/config");
const { createClient } = require("../lib/grenache/client");

const { peer } = createClient(config.GRENACHE.URL);

module.exports = {
  peer,
};
