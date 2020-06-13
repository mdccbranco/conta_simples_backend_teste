const { getObjectId } = require("mongo-seeding");

const users = [
  {
    username: "user1",
    password: "conta1",
    cnpj: "68.472.706/0001-90",
    _id: getObjectId("user1"),
  },
  {
    username: "user2",
    password: "conta2",
    cnpj: "04.464.640/0001-03",
    _id: getObjectId("user2"),
  },
  {
    username: "user3",
    password: "conta3",
    cnpj: "40.595.984/0001-15",
    _id: getObjectId("user3"),
  },
];

module.exports = users;
