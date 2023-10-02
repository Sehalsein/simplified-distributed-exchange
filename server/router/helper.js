const { readdirSync } = require("fs");
const { join } = require("path");

const parseServiceRoutes = (path) => {
  return readdirSync(path)
    .map((f) => require(join(path, f)))
    .filter((f) => f.name)
    .reduce((ms, m) => {
      ms[m.name] = { actions: m.actions, name: m.name };
      return ms;
    }, {});
};

module.exports = {
  parseServiceRoutes,
};
