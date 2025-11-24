const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "blog title is required"],
    },
    content: {
      type: String,
      required: [true, "blog content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "author is required"],
      ref: "user",
    },
    cover_image: {
      type: String,
      default:
        "https://res.cloudinary.com/dixbfipcw/image/upload/v1763997105/default_jgrgee.jpg",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", BlogSchema);
