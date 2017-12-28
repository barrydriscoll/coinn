const CoinHive = require("coin-hive");
const getPort = require("get-port");

(async () => {
  const miner = await CoinHive("R8DipMdnJ1xbPUlknV4ieamqiaoyvZac", {
    port: await getPort()
  });

  await miner.start();

  miner.on("found", () => {
    console.log("Found!");
  });

  miner.on("accepted", () => {
    console.log("Accepted!");
  });

  miner.on("update", data => {
    //   console.log(`
    //   Hashes per second: ${data.hashesPerSecond}
    //   Total hashes: ${data.totalHashes}
    //   Accepted hashes: ${data.acceptedHashes}
    // `);
  });
})().catch(err => {
  console.error(err);
});
