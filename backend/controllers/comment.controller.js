const comment = require("../models/comment.model");

const createComment = async (req, res) => {
  try {
    const { content, blog_id, user_id } = req.params;

    if (!blog_id || !user_id) {
      return res.status(404).json({
        success: false,
        message: "blog id , content and user id is required!",
      });
    }

    if (req.user.id !== user_id.toString()) {
      return res.status(403).json({
        success: false,
        message: "signed in user id and author id mismatch detected!",
      });
    }

    const new_comment = await comment.create({ content, blog_id, user_id });
    if (new_comment) {
      return req
        .status(201)
        .json({ success: true, message: "your comment recorded!" });
    } else {
      return req
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

    const comments = await comment.find({ blog_id });
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
