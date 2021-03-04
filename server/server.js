const express = require("express");
const app = express();
const routes = require("./routes/user");
const contentRoutes = require("./routes/content");

app.use("/user", routes);
app.use("/content", contentRoutes);

app.use(express.json());
app.listen(3002, () => console.log("server Started"));
