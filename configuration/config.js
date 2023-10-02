require("dotenv").config();

const isDev = process.env.NODE_ENV === "development";

const config = {
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEV: isDev,

  GRENACHE: {
    URL: process.env.GRENACHE_URL || "http://127.0.0.1:30001",
  },
};

if (isDev) {
  console.log(config);
}

// TODO: We can add config validation schema validation libraries like zod, joi etc.

module.exports = config;
