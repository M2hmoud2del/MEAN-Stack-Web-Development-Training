const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const path = require("path");
const dbConnect = require("./config/db-connect");
require("dotenv").config();
const courseRouter = require("./routes/course-routes");

dbConnect();

const app = express();

app.use(express.json());

app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/courses", courseRouter);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port 5000");
});
