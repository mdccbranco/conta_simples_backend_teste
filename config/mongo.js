const { ObjectId } = require("mongodb");

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost";
const client = new MongoClient(url,  { useUnifiedTopology: true });
let _db;
module.exports = {
	connectToServer: () => {
		client.connect(async err => {
			if (err) return console.error(err);
			console.warn("Mongo connected");
			_db = client.db("conta-simples-test");
			return true;
		});
	},
	getDb: () => {
		return _db;
	}
};