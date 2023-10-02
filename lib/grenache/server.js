const { PeerRPCServer } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");

const createServer = (url) => {
  const link = new Link({
    grape: url,
  });
  link.start();

  const peer = new PeerRPCServer(link, {
    timeout: 300000,
  });
  peer.init();

  const port = 1024 + Math.floor(Math.random() * 1000);
  const service = peer.transport("server");
  service.listen(port);

  return {
    link,
    peer,
    service,
  };
};

module.exports = {
  createServer,
};
