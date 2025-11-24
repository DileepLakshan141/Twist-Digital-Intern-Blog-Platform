const comment = require("../models/comment.model");

const createComment = async (req, res) => {
  try {
    const { content, blog_id } = req.body;

    if (!blog_id || !content) {
      return res.status(404).json({
        success: false,
        message: "blog id and content is required!",
      });
    }

    if (!req.user.id) {
      return res.status(403).json({
        success: false,
        message: "no user_id detected in the session!",
      });
    }
    const user_id = req.user.id;
    const new_comment = await comment.create({
      comment: content,
      blog_id,
      user_id,
    });
    if (new_comment) {
      return res.status(201).json({
        success: true,
        message: "your comment recorded!",
        comment: new_comment,
      });
    } else {
      return res
        .status(400)
        .json({ success: true, message: "error occurred! comment not added!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "server error! comment create process failed!",
    });
  }
};

const getAllCommentsForBlog = async (req, res) => {
  try {
    const { blog_id } = req.params;

    if (!blog_id) {
      return req
        .status(404)
        .json({ success: false, message: "blog id not found inside params!" });
    }

    const comments = await comment
      .find({ blog_id })
      .populate({
        path: "user_id",
        select: "username profile_pic createdAt",
      })
      .populate({
        path: "blog_id",
        select: "title cover_image",
      });
    return res.status(200).json({
      success: true,
      message: "comments fetched successfully!",
      comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "server error! comment fetching process failed!",
    });
  }
};

module.exports = { createComment, getAllCommentsForBlog };
