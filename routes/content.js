const { json } = require("express");
const express = require("express");
const Contentrouter = express.Router();
const bodyParser = require("body-parser");
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

Contentrouter.get("/:resource", async (req, res, next) => {
  try {
    let contents = await db.GetContentByName(req.params.resource);
    res.json(contents);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

Contentrouter.get("/id/:id", async (req, res, next) => {
  try {
    let contentResult = await db.GetContentById(req.params.id);
    res.json(contentResult);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Cannot get the resource" });
  }
});

module.exports = Contentrouter;
