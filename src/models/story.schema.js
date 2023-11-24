const mongoose = require("mongoose");
const storySubdoc = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const storySchema = new mongoose.Schema({
  story: [storySubdoc],
  userId: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("story", storySchema);
