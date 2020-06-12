require("dotenv").config();
const express = require("express");
const body_parser = require("express");
const jwt = require("jsonwebtoken");

const { PORT, JWT_PW } = process.env;
const mongoSeed = require("../config/mongo-seeding");
const mongo = require("../config/mongo");
const app = express();

mongo.connectToServer();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = mongo.getDb();
    const user = await db.collection("users").findOne({ username, password });
    const token = jwt.sign({ username: user.username, _id: user._id}, JWT_PW);
    res.status(200).json({ token });
  } catch (err) {
    res.status(200).json({ msg: "Failed to authenticate" });
  }
});

app.get("/auth", (req, res) => {
  let token = req.header("Authorization");
  if (token) {
    token = token.split(" ")[1];
    const ok = jwt.verify(token, JWT_PW);
    res.status(200).json(ok);
  } else {
    res.status(500).json({ msg: "User not authenticated" });
  }
});

app.listen(PORT !== undefined ? PORT : 3300, () => {
  console.warn(
    "App is running at http://localhost:" + (PORT !== undefined ? PORT : 3300)
  );
});

module.exports = app;
