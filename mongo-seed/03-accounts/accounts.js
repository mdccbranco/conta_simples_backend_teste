const { getObjectId } = require("mongo-seeding");

const accounts = [
  {
    owner: getObjectId("user1"),
    bank: getObjectId("bank1"),
    accountNumber: 121,
    _id: getObjectId("account1"),
  },
  {
    owner: getObjectId("user2"),
    bank: getObjectId("bank1"),
    accountNumber: 122,
    _id: getObjectId("account2"),
  },
  {
    owner: getObjectId("user1"),
    bank: getObjectId("bank2"),
    accountNumber: 123,
    _id: getObjectId("account3"),
  },
  {
    owner: getObjectId("user3"),
    bank: getObjectId("bank1"),
    accountNumber: 123,
    _id: getObjectId("account4"),
  },
];

module.exports = accounts;
