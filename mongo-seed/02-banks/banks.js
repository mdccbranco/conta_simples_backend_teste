const { getObjectId } = require("mongo-seeding");

const banks = [
  {
    bankName: "bank1",
    _id: getObjectId("bank1"),
  },
  {
    bankName: "bank2",
    _id: getObjectId("bank2"),
  },
];

module.exports = banks;
