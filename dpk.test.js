const { determinPartitionKey } = require("./dpk");
const { hashData } = require("./dpk")

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = determinPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the hashed Event when given no partition key ", () => {
    let event = { partitionKey: null, title: "title" }
    let expectedKey = hashData(event)
    const partitionKey = determinPartitionKey(event);
    expect(partitionKey).toBe(expectedKey);
  });
  it("Returns event partition key when it is of type string", () => {
    let event = { partitionKey: '1', title: "title" }
    let expectedKey = '1'
    const partitionKey = determinPartitionKey(event);
    expect(partitionKey).toBe(expectedKey);
  });
  it("Returns stringified event partition key when it is of non string", () => {
    let event = { partitionKey: { key: 1 }, title: "title" }
    let expectedKey = JSON.stringify(event.partitionKey);
    const partitionKey = determinPartitionKey(event);
    expect(partitionKey).toBe(expectedKey);
  });

  it("Returns hashed event partition key when the length of the partition key is greater than 256", () => {
    let text = "Hello world!";
    let result = text.repeat(200);
    let event = { partitionKey: result, title: "title" }
    let expectedKey = hashData(event.partitionKey)
    const partitionKey = determinPartitionKey(event);
    expect(partitionKey).toBe(expectedKey);
  });
});