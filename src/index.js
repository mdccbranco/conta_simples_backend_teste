require("dotenv").config();
const express = require("express");
const body_parser = require("express");
const jwt = require("jsonwebtoken");

const { PORT, JWT_PW } = process.env;
const mongoSeed = require("../config/mongo-seeding");
const mongo = require("../config/mongo");
const { ObjectId } = require("mongodb");
const app = express();

mongo.connectToServer();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = mongo.getDb();
    const user = await db.collection("users").findOne({ username, password });
    const token = jwt.sign({ username: user.username, _id: user._id }, JWT_PW);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Failed to authenticate" });
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

app.get("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = mongo.getDb();
    // console.log(id, ObjectId(id));
    const transactons = await db
      .collection("transactions")
      .aggregate([
        {
          $lookup: {
            from: "accounts",
            localField: "payer",
            foreignField: "_id",
            as: "payer",
          },
        },
        {
          $lookup: {
            from: "accounts",
            localField: "beneficiary",
            foreignField: "_id",
            as: "beneficiary",
          },
        },
        { $unwind: { path: "$beneficiary", preserveNullAndEmptyArrays: true } },
        { $unwind: "$payer" },
        {
          $lookup: {
            from: "users",
            localField: "payer.owner",
            foreignField: "_id",
            as: "payer.owner",
          },
        },
        {
          $lookup: {
            from: "banks",
            localField: "payer.bank",
            foreignField: "_id",
            as: "payer.bank",
          },
        },
        { $unwind: "$payer.owner" },
        { $unwind: "$payer.bank" },
        {
          $lookup: {
            from: "users",
            localField: "beneficiary.owner",
            foreignField: "_id",
            as: "beneficiary.owner",
          },
        },
        {
          $lookup: {
            from: "banks",
            localField: "beneficiary.bank",
            foreignField: "_id",
            as: "beneficiary.bank",
          },
        },
        {
          $unwind: {
            path: "$beneficiary.owner",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$beneficiary.bank",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            "payer.owner.password": 0,
            "beneficiary.owner.password": 0,
          },
        },
        {
          $match: {
            $or: [
              { "payer.owner._id": ObjectId(id) },
              { "beneficiary.owner._id": ObjectId(id) },
            ],
          },
        },
      ])
      .toArray();

    res.status(200).json(transactons);
  } catch (err) {
    res.status(500).json({ msg: "Failed to authenticate" });
  }
});

app.listen(PORT !== undefined ? PORT : 3300, () => {
  console.warn(
    "App is running at http://localhost:" + (PORT !== undefined ? PORT : 3300)
  );
});

module.exports = app;
