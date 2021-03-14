const express = require("express");
const staffDB = require("../db");
const router = express.Router();
const db = require("../db");

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
      total.push({ "id": key, "resourceName": resultName, "progressVal": progressResult });
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
    for(var key in  result){
        console.log(result[key].content_id);
        var content = await db.GetContentById(result[key].content_id);
        for(var contentKey in content){
            mainResult.push({"content_id" : content[contentKey].content_id, "content_description":content[contentKey].content_description, "content_text" :content[contentKey].content_text, "content_title": content[contentKey].content_title });
        }
    }
    res.json(mainResult);
   
  } catch (error) {
    res.sendStatus(500);
  }
});
module.exports = router;
