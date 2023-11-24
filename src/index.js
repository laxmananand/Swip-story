const express = require("express");
require("dotenv").config();
const app = express();
const conn = require("./config/dbconn");
conn();

const port = process.env.PORT;

const router = require("./router/index");

app.use(express.json());
app.use("/", router);
app.get("/health", (req, res) => {
  res.send("server testing");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
