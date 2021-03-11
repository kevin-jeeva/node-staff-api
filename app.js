const express = require("express");
const app = express();
const routes = require("./routes/user");
const contentRoutes = require("./routes/content");
const mediaRoutes = require("./routes/media");

app.use("/user", routes);
app.use("/content", contentRoutes);
app.use("/media", mediaRoutes);

app.use(express.json());
const port = process.env.port || 3002;
app.listen(port, () => console.log("server Started"));
