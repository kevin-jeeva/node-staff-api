const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res, next) => {
  try {
    let results = await db.all();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let results = await db.one(req.params.id);
    res.json(results);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/:email/:password", async (req, res, next) => {
  try {
    let result = await db.GetUserByEmail(req.params.email);
    plain = req.params.password;
    hash = result[0].password;
    bcrypt.compare(plain, hash, function (err, isMatch) {
      if (err) {
        res.status(500).send({ error: "Error in server :)" });
      } else if (!isMatch) {
        res.status(500).send({ error: "Invalid password Match" });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    res.status(500).send({ error: "Invalid Email Address" });
  }
});

module.exports = router;
