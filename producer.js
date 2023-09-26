const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected Successfully");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async function (line) {
    const [traderName, crypto] = line.split(" ");
    await producer.send({
      topic: "trade-updates",
      messages: [
        {
          partition: crypto.toLowerCase() === "btc" ? 0 : 1,
          key: "crypto-update",
          value: JSON.stringify({ name: traderName, crypto }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
}

init();