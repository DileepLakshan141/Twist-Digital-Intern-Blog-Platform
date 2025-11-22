const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "comment must have a content"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "comment must have an author"],
      ref: "user",
    },
    blog_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "comment must have a blog"],
      ref: "blog",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", CommentSchema);
