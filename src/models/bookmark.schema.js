const mongoose = require("mongoose");
const bookmarkSchema = new mongoose.Schema({
  storyId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("bookmark", bookmarkSchema);
