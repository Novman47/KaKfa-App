const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  admin.connect();
  console.log("Adming Connection Success...");

  console.log("Creating Topic [trade-updates]");
  await admin.createTopics({
    topics: [
      {
        topic: "trade-updates",
        numPartitions: 3,
      },
    ],
  });
  console.log("Topic Created Success [trade-updates]");

  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

init();