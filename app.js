const express = require("express");
const app = express();
const routes = require("./routes/user");
const contentRoutes = require("./routes/content");

app.use("/user", routes);
app.use("/content", contentRoutes);

app.use(express.json());
const port = process.env.port || 3002;
app.listen(port, () => console.log("server Started"));
