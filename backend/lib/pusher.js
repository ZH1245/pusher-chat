const Pusher = require("pusher");

const pusher = new Pusher({
  key: "8446967bdc196e48bfbc",
  secret: "7e974d806c77f9824d4c",
  cluster: "ap2",
  appId: "1425242",

  useTLS: true,
});

module.exports = pusher;
