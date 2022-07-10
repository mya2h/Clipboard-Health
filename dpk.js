const crypto = require("crypto");

const determinPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let partitionKey;

  if (event) {
    if (event.partitionKey) {
      partitionKey = event.partitionKey;

      if (typeof partitionKey !== "string") {
        partitionKey = JSON.stringify(partitionKey);
      }

      if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
        partitionKey = hashData(partitionKey)
      }

    } else {
      partitionKey = hashData(event)
    }
  } else {
    partitionKey = TRIVIAL_PARTITION_KEY;
  }
  return partitionKey;
};

const hashData = (data) => {
  if (typeof data != "string") {
    data = JSON.stringify(data)
  }
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

module.exports = { determinPartitionKey, hashData }