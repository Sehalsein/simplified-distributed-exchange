const { PeerRPCClient } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");

const createClient = (url) => {
  const link = new Link({
    grape: url,
  });
  link.start();

  const peer = new PeerRPCClient(link, {
    timeout: 300000,
  });
  peer.init();

  return {
    peer,
  };
};

module.exports = {
  createClient,
};
