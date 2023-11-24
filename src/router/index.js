const express = require("express");
const router = express.Router();

const authRoute = require("./auth.router");
const storyRoute = require("./story.router");

router.use("/auth", authRoute);
router.use("/story", storyRoute);

module.exports = router;
