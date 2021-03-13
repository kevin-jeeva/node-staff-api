const express = require("express");
const app = express();
const routes = require("./routes/user");
const contentRoutes = require("./routes/content");
const mediaRoutes = require("./routes/media");
const progressRoutes = require("./routes/progress");

app.use("/user", routes);
app.use("/content", contentRoutes);
app.use("/media", mediaRoutes);
app.use("/progress", progressRoutes);

app.use(express.json());
const port = process.env.port || 3002;
app.listen(port, () => console.log("server Started"));
