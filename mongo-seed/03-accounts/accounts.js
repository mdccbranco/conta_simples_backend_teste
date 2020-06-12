const { getObjectId } = require("mongo-seeding");

const accounts = [
  {
    owner: getObjectId("user1"),
    bank: getObjectId("bank1"),
    accountNumber: 121,
  },
  {
    owner: getObjectId("user2"),
    bank: getObjectId("bank1"),
    accountNumber: 122,
  },
  {
    owner: getObjectId("user1"),
    bank: getObjectId("bank2"),
    accountNumber: 123,
  },
];

module.exports = accounts;
