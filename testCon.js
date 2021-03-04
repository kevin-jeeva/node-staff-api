var mysql = require("mysql");
const express = require("express");
const app = express();

var con = mysql.createConnection({
  host: "staff-wellness-app.c97g5kpuab3n.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "StaffNbcc001",
  database: "staff",
  port: "3311",
});

app.get("/", (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM user", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.listen(3001, () => {
  console.log("hello world");
});
