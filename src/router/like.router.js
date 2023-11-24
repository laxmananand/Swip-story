const express = require("express");
const router = express.Router();
const User = require("../models/user.schema");
const Story = require("../models/story.schema");
const Like = require("../models/like.schema");
const { verifyJwt } = require("../middleware/auth.middleware");

// Like a story
router.put("/:storyId/like", verifyJwt, async (req, res) => {
  try {
    const { userId } = req.user;
    const { storyId } = req.params;

    const user = await User.findById(userId);
    const story = await Story.findById(storyId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }

    if (!story) {
      return res
        .status(404)
        .json({ message: "story not found", success: false });
    }

    // Add story to user's likes
    const like = await new Like({
      storyId,
      userId,
    });
    await like.save();

    return res.status(200).json({ message: "Story liked", success: true });
  } catch (err) {
    console.log("Unable to like a story", err);
    return res.status(500).json({ message: "internal server error" });
  }
});

// Unlike a story
router.put("/:storyId/unlike", verifyJwt, async (req, res) => {
  try {
    const { userId } = req.user;
    const { storyId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }
    like = await Like.findOne({ userId: userId, storyId: storyId });
    if (!like) {
      return res
        .status(404)
        .json({ message: "like not found", success: false });
    }
    // Remove storyId from user's likes
    like = like.filter((id) => String(id) !== storyId);
    await like.save();

    return res.status(200).json({ message: "Story unliked", success: true });
  } catch (err) {
    console.log("Unable to unlike a story", err);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
});
module.exports = router;
