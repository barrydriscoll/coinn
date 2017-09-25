const http = require('http');
const CoinHive = require('coin-hive');

const PORT = +(process.env.PORT || 3004);

(async () => {
  console.info(`Listen on ${PORT}`);
  http
    .createServer(function(req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write("Hi, I am Axetroy' miner, I am digesting...");
      res.end();
    })
    .listen(PORT, 'localhost');

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
