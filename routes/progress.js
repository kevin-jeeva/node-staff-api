const express = require("express");
const staffDB = require("../db");
const router = express.Router();
const db = require("../db");

router.get("/resource/:staffId", async (req, res, next) => {
  try {
    const result = await db.GetResourceInProgress();
    const staffId = req.params.staffId;
    var total = [];
    for (var key in result) {
      let resultName = result[key].resource_name;
      var contentIds = await db.GetContentIdsByName(resultName);
      var userProgress = await db.GetProgressByResourceName(resultName,staffId);

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
      total.push({ "resourceName": resultName, "progressVal": progressResult });
      //console.log(total);
    }
    res.json(total);
    // res.json(result);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
