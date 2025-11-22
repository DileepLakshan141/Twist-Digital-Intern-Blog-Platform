const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema(
  {
    blog_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "like must have a blog"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "like must have an author"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("like", LikeSchema);
