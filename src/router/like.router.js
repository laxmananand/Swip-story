const express = require("express");
const router = express.Router();
const User = require("../models/user.schema");
const Story = require("../models/story.schema");
const Like = require("../models/like.schema");
const { verifyJwt } = require("../middleware/auth.middleware");

// Like a story
router.post("/:storyId", verifyJwt, async (req, res) => {
  try {
    const userId = req.locals.user._id;

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
    // const like = await new Like({
    //   storyId,
    //   userId,
    // });
    // await like.save();
    await Like.updateOne(
      { storyId, userId },
      {
        $set: {
          storyId,
          userId,
        },
      },
      {
        upsert: true,
      }
    );

    return res.status(200).json({ message: "Story liked", success: true });
  } catch (err) {
    console.log("Unable to like a story", err);
    return res.status(500).json({ message: "internal server error" });
  }
});

// Unlike a story
router.delete("/:likeId", verifyJwt, async (req, res) => {
  try {
    const userId = req.locals.user._id;

    const { likeId } = req.params;

    const user = await User.findById(userId);
    const like = await Like.findById(likeId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }
    if (!like) {
      return res
        .status(404)
        .json({ message: "like not found", success: false });
    }
    // Remove storyId from user's likes
    // like = like.filter((id) => String(id) !== storyId);
    // await like.save();
    await Like.deleteOne({
      userId: userId,
      id: likeId,
    });
    return res.status(200).json({ message: "Story unliked", success: true });
  } catch (err) {
    console.log("Unable to unlike a story", err);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
});
module.exports = router;
