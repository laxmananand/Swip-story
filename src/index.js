const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors({ origin: "*" }));
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
