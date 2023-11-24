const express = require("express");
const router = express.Router();

const authRoute = require("./auth.router");
const storyRoute = require("./story.router");
const bookmarkRoute = require("./bookmark.router");
const likeRoute = require("./like.router");

router.use("/auth", authRoute);
router.use("/story", storyRoute);
router.use("/bookmark", bookmarkRoute);
router.use("/like", likeRoute);

module.exports = router;
