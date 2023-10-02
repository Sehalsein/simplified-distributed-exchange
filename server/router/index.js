const { join } = require("path");
const { parseServiceRoutes } = require("./helper");

const services = parseServiceRoutes(join(__dirname, "../service"));

const handleRoutes = async (rid, key, payload, handler) => {
  console.log("request", rid, key, payload);

  if (!services[key]) {
    return handler.reply({ message: "Service not found" }, null);
  }

  const { action, args } = payload;

  if (!action || !services[key].actions || !services[key].actions[action]) {
    return handler.reply({ message: "Action not found" }, null);
  }

  const serviceAction = services[key].actions[action];

  try {
    const result = args ? await serviceAction(...args) : await serviceAction();
    return handler.reply(null, result);
  } catch (error) {
    return handler.reply(
      { message: error.message || "Something went wrong" },
      null
    );
  }
};

module.exports = {
  handleRoutes,
};
