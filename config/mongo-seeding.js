const path = require("path");
const { Seeder } = require("mongo-seeding");

const config = {
  database: {
    name: "conta-simples-test",
  },
  dropDatabase: true,
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
  path.resolve("./mongo-seed"),
  {
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
  }
);

(async () => {
  try {
    await seeder.import(collections);
    console.log("Data successfully inserted in MongoDB");
  } catch (err) {
    console.log("Error entering data. Please run again the application.");
  }
})()
