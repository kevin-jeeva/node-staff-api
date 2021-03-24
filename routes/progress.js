const express = require("express");
const staffDB = require("../db");
const router = express.Router();
const db = require("../db");
const { route } = require("./user");

router.get("/resource/:staffId", async (req, res, next) => {
  try {
    const result = await db.GetResourceInProgress();
    const staffId = req.params.staffId;
    var total = [];
    var key = 0;

    for (var key in result) {
      let resultName = result[key].resource_name;
      var contentIds = await db.GetContentIdsByName(resultName);
      var userProgress = await db.GetProgressByResourceName(
        resultName,
        staffId
      );

      //temp variables
      var contents = 0;
      var progressValue = 0;

      //get the total
      for (var key2 in contentIds) {
        contents += 1;
      }

      //get the progress value
      for (var key3 in userProgress) {
        progressValue += userProgress[key3].progress_value;
      }
      console.log(resultName + " " + progressValue);

      let progressResult = progressValue / contents / 100;
      console.log(progressResult);
      total.push({
        id: key,
        resourceName: resultName,
        progressVal: progressResult,
      });
      key += 1;
      //console.log(total);
    }
    res.json(total);
    // res.json(result);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/resource/suggest/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await db.GetSuggested(userId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/most_viewed/:userId", async (req, res, next) => {
  try {
    const staff_id = req.params.userId;
    const result = await db.GetMostViewed(staff_id);
    var mainResult = [];
    for (var key in result) {
      console.log(result[key].content_id);
      var content = await db.GetContentById(result[key].content_id);
      for (var contentKey in content) {
        mainResult.push({
          content_id: content[contentKey].content_id,
          content_description: content[contentKey].content_description,
          content_text: content[contentKey].content_text,
          content_title: content[contentKey].content_title,
        });
      }
    }
    res.json(mainResult);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/resolution/:id", async (req, res, next) => {
  try {
    const result = await db.GetResolution();
    const user_id = req.params.id;
    var total_result = [];
    for (var key in result) {
      var read_users = result[key].read_user;
      if (read_users != null) {
        var split_users = read_users.split("|");
        var user_exists = split_users.includes(user_id.toString());
        if (!user_exists) {
          console.log("here");
          total_result.push({
            res_id: result[key].res_id,
            res_text: result[key].res_text,
          });
        }
      } else {
        total_result.push({
          res_id: result[key].res_id,
          res_text: result[key].res_text,
        });
      }
    }
    res.send(total_result);
  } catch (error) {
    res.status(500).send({ error: "Error getting the resolution" });
  }
});

router.post("/resolution/user/:id/res/:resId", async (req, res, next) => {
  try {
    const result = await db.GetResolutionById(req.params.resId);
    var read_user = 0;
    for (var key in result) {
      read_user = result[key].read_user;
    }
    if (read_user == null) console.log("here");
    read_user =
      read_user == null ? req.params.id + "|" : read_user + req.params.id + "|";
    const result_2 = await db.UserReadResolution(read_user, req.params.resId);
    res.status(201).send({ message: "user inserted into the table" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
