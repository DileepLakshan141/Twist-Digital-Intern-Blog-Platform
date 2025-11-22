const like = require("../models/like.model");
const blog = require("../models/blog.model");

const createLikeInteraction = async (req, res) => {
  try {
    const { blog_id } = req.params;
    if (!blog_id) {
      return res
        .status(400)
        .json({ success: false, message: "blog id is required!" });
    }

    const target_blog = await blog.findById(blog_id);
    if (!target_blog) {
      return res.status(404).json({
        success: false,
        message: "blog no longer exists inside database",
      });
    }

    const user_id = req.user.id;

    const duplicate = await like.findOne({ blog_id, user_id });
    if (duplicate) {
      return res
        .status(400)
        .json({ success: false, message: "you have already liked this blog" });
    }

    const updatedBlog = await blog.findByIdAndUpdate(
      blog_id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    const like_interaction = await like.create({ blog_id, user_id });
    if (like_interaction) {
      return res.status(201).json({
        success: true,
        message: "you liked this blog!",
        data: {
          likes: updatedBlog.likes,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "like not added! try again later!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "server error! like count not updated!",
    });
  }
};

module.exports = { createLikeInteraction };
