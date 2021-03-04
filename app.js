const express = require("express");
const app = express();

app.get("localhost/testCon.js", (req, res) => {
  res.send(req);
});

app.listen(3000, () => {
  console.log("Wazzap");
});
