const express = require("express");
const app = express();
const routes = require("../routes/user");
const contentRoutes = require("../routes/content");

// app.use("/user", routes);
// app.use("/content", contentRoutes);
app.get("/", (req, res) => {
  res.send("Welecome to the home page baby");
});
app.use(express.json());
const port = process.env.port || 8080;
app.listen(port, () => console.log("server Started"));
