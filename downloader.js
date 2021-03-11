const { DownloaderHelper } = require("node-downloader-helper");

const m = "101612914676.mp4";

const dl = new DownloaderHelper(
  "http://localhost/nbcc_staffwellness/includes/videos/" + m,
  "./routes/downloads/"
);

dl.on("end", () => console.log("downloaded"));

dl.start();
