const express = require("express");
const router = express.Router();
const db = require("../db");

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

router.post("/:email", async (req, res, next) => {
  try {
    let result = await db.GetUserByEmail(req.params.email);
    res.json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
