const express = require("express");
const app = express();
const routes = require("../routes/user");
const contentRoutes = require("../routes/content");

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "bbwdsodmha5qenqysheo-mysql.services.clever-cloud.com",
  user: "ukesuock61ki5xii",
  password: "gvXyXLgJiXsGV9DG5J6i",
  database: "bbwdsodmha5qenqysheo",
  host: "bbwdsodmha5qenqysheo-mysql.services.clever-cloud.com",
  port: "3306",
});

// app.use("/user", routes);
// app.use("/content", contentRoutes);
app.get("/", (req, res) => {
  res.send("Welecome to the home page baby");
});
app.use(express.json());
const port = process.env.port || 8080;
app.listen(port, () => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected! to the database");
    con.query(`SELECT * FROM user`, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });
});
