const { getObjectId } = require("mongo-seeding");

const transactions = [
  {
    payer: getObjectId("account1"),
    beneficiary: getObjectId("account3"),
    type: "transfer",
    value: 200,
    date: new Date("2010-05-20T13:34:22"),
  },
  {
    payer: getObjectId("account1"),
    companyName: "Company1",
    type: "payment",
    value: 200,
    date: new Date("2010-05-28T09:24:33"),
  },
  {
    payer: getObjectId("account2"),
    beneficiary: getObjectId("account1"),
    type: "transfer",
    value: 20,
    date: new Date("2010-05-20T20:34:45"),
  },
  {
    payer: getObjectId("account2"),
    beneficiary: getObjectId("account1"),
    type: "transfer",
    value: 20,
    date: new Date("2010-05-20T20:34:45"),
  },
  {
    payer: getObjectId("account2"),
    companyName: "Company2",
    type: "payment",
    value: 230,
    date: new Date("2010-05-28T09:24:33"),
  },
  {
    payer: getObjectId("account4"),
    beneficiary: getObjectId("account2"),
    type: "transfer",
    value: 20,
    date: new Date("2010-05-20T20:34:45"),
  },
];

module.exports = transactions;