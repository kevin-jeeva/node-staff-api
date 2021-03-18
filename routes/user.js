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

router.get("/phone/:id", async (req, res, next) => {
  try {
    const result = await db.GetPhoneById(req.params.id);
    res.json(result);
  } catch (error) {
    console.log(error);
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

router.post("/changePassword/:email/:password", async (req, res, next) => {
  try {
    let result = await db.GetUserByEmail(req.params.email);
    var email = req.params.email;
    var password = req.params.password;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const r = updatePass(email, hash);
        res.status(200).send({ msg: "Password Updated" });
      });
    });
  } catch (error) {
    res.status(500).send({ error: "Invalid Email Address" });
  }
});

const updatePass = (email, hash) => {
  console.log(hash);
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.UpdatePassword(email, hash);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = router;
