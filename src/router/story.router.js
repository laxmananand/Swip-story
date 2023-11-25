const express = require("express");
const router = express.Router();
const Story = require("../models/story.schema");
const { verifyJwt } = require("../middleware/auth.middleware");

router.get("/view-story", async (req, res) => {
  try {
    const story = await Story.find();
    res.json({ message: "Story fetched", success: true, data: story });
  } catch (err) {
    console.log("unable to fetch story", err);
  }
});
//TODO add joi validation for story limit chekc array and fields
router.post("/add-story", verifyJwt, async (req, res) => {
  try {
    const userId = req.locals.user._id;
    const { story } = req.body;
    console.log("---------------------story body------------------------");
    console.dir({ story }, { depth: null });
    const storyobj = await new Story({
      story,
      userId,
    });
    await storyobj.save();
    return res
      .status(200)
      .json({ message: "Story created successfully", success: true });
  } catch (err) {
    console.log("unable to create Story", err);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
});

router.put("/update-story/:storyId", verifyJwt, async (req, res) => {
  try {
    console.log("updating");
    const { storyId } = req.params;
    const { story } = req.body;
    console.log(storyId);
    const result = await Story.updateOne(
      { _id: storyId },
      {
        story: story.map((data) => {
          return {
            heading: data.heading,
            description: data.heading,
            imageUrl: data.imageUrl,
            category: data.category,
          };
        }),
      }
    );
    console.log({ result });
    if (result.modifiedCount)
      return res
        .status(200)
        .json({ message: "Story updated successfully", success: true });
    if (!result.matchedCount || !result.modifiedCount)
      return res
        .status(400)
        .json({
          messsage: "couldn't update the story, invalid id",
          success: false,
        });
  } catch (err) {
    console.log("Unable to update a story", err);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
});

router.delete("/delete-story", verifyJwt, async (req, res) => {
  try {
    const { sid } = req.body;
    await Story.deleteOne({ _id: sid });
    return res.json({ message: "Story deleted successfully", success: true });
  } catch (err) {
    console.log("Unable to delete a story", err);
    return res.json({ message: "internal server error", success: false });
  }
});

router.get("/filter-story", async (req, res) => {
  try {
    const { category } = req.body;
    const stories = await Story.find({ "story.category": category });
    const result = stories.filter((data) => {
      return data.story.category === category;
    });
    res.json({ message: "Story fetched", success: true, data: result });
  } catch (err) {
    console.log("unable to fetch story", err);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
});

router.get("/view-story/:storyId", async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findById({ _id: storyId });
    res.json({ message: "Story fetched", success: true, data: story });
  } catch (err) {
    console.log("unable to fetch story", err);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
});

module.exports = router;
