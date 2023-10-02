const crypto = require("crypto");

function hashString(payload) {
  const hash = crypto.createHash("sha256");
  hash.update(payload);
  return hash.digest("hex");
}

module.exports = {
  hashString,
};
