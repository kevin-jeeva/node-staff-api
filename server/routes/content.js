const express = require("express");
const Contentrouter = express.Router();
const db = require("../db");

Contentrouter.get("/", async (req, res, next) => {
  try {
    let contents = await db.GetContent();
    res.json(contents);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

Contentrouter.get("/:resource", async (res, req, next) => {
  try {
    let contents = await db.GetContentByName(req.params.resource);
    res.json(contents);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
module.exports = Contentrouter;
