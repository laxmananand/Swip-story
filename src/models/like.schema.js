const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
  storyId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("like", likeSchema);
