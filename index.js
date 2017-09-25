const express = require('express');
const http = require('http');
const CoinHive = require('coin-hive');

const PORT = +(process.env.PORT || 8888);

(async () => {
  const app = express();

  app.use(function(req, res) {
    res.send(`Hi, I am Axetroy' miner, I am digesting...`);
  });

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log('Listening on %d', server.address().port);
  });

  const miner = await CoinHive('R8DipMdnJ1xbPUlknV4ieamqiaoyvZac', {
    port: PORT + 1
  });

  await miner.start();

  miner.on('found', () => {
    console.log('Found!');
  });

  miner.on('accepted', () => {
    console.log('Accepted!');
  });

  miner.on('update', data => {
    console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `);
  });
})();
