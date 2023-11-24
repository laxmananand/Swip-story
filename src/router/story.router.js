const express = require("express");
const router = express.Router();
const Story = require("../models/story.schema");
const { verifyJwt } = require("../middleware/auth.middleware");

router.get("/view-story", verifyJwt, async (req, res) => {
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
    return res.status(500).send("internal server error");
  }
});

router.put("/update-story", verifyJwt, async (req, res) => {
  try {
    const { sid } = req.body;
    await Story.updateMany(
      { _id: sid },
      {
        $set: {
          heading: req.body.heading,
          description: req.body.description,
          imageUrl: req.body.imageUrl,
          category: req.body.category,
        },
      }
    );
    res.json({ message: "Story updated successfully", success: true });
  } catch (err) {
    console.log("Unable to update a story", err);
  }
});

module.exports = router;
