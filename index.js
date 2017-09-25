const CoinHive = require('coin-hive');

(async () => {
  const miner = await CoinHive('R8DipMdnJ1xbPUlknV4ieamqiaoyvZac', {
    port: process.env.PORT || 3004
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
