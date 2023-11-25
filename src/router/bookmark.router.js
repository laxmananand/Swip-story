const express = require("express");
const router = express.Router();
const Story = require("../models/story.schema");
const User = require("../models/user.schema");
const Bookmark = require("../models/bookmark.schema");
const { verifyJwt } = require("../middleware/auth.middleware");

// Bookmark a story
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

    // Add to user's bookmarks
    // const bookmark = await new Bookmark({
    //   storyId,
    //   userId,
    // });
    // await bookmark.save();
    await Bookmark.updateOne(
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

    return res.status(200).json({ message: "Story bookmarked", success: true });
  } catch (err) {
    console.error("Unable to bookmark a story", err);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
});

// Unbookmark a story
router.delete("/:bookmarkId", verifyJwt, async (req, res) => {
  try {
    const userId = req.locals.user._id;
    const { bookmarkId } = req.params;
    console.log(userId);
    const user = await User.findById(userId);
    const bookmark = await Bookmark.findById(bookmarkId);
    if (!bookmark) {
      return res
        .status(404)
        .json({ message: "bookmark not found", success: false });
    }
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }
    await Bookmark.deleteOne({
      userId: userId,
      _id: bookmarkId,
    });
    return res
      .status(200)
      .json({ message: "Story unbookmarked", success: true });
  } catch (err) {
    console.log("Unable to unbookmark a story", err);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
});

module.exports = router;
