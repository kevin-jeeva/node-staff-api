const express = require("express");
const MediaRouter = express.Router();
const db = require("../db");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

MediaRouter.get("/videos", async (req, res, next) => {
  try {
    let result = await db.GetVideos();
    for (var key in result) {
      media_object = result[key].media_path;
      console.log(media_object);
      DownloadVideo(media_object);
    }
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
});

MediaRouter.get("/videos/:file", (req, res, next) => {
  try {
    const filename = req.params.file;
    res.sendFile(__dirname + "/downloads/videos/" + filename);
  } catch (error) {
    res.sendStatus(500);
  }
});

async function DownloadVideo(media) {
  const url = "http://localhost/nbcc_staffwellness/includes/videos/" + media;
  const imagePath = path.resolve(__dirname, "downloads/videos", media);

  const writer = fs.createWriteStream(imagePath);

  const response = await axios({
    url: url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

module.exports = MediaRouter;
