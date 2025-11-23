const blog = require("../models/blog.model");

const createNewBlog = async (req, res) => {
  try {
    let { title, content, author_id, cover_image } = req.body;

    if (!title || !content || !author_id) {
      return res.status(400).json({
        success: false,
        message: "title , content and author id fields are mandatory",
      });
    }

    title = title?.trim();
    content = content?.trim();

    if (req.user.id !== author_id) {
      return res.status(403).json({
        success: false,
        message:
          "mismatching author ids! signed in user id and received user id not matching!",
      });
    }

    let blog_data = {
      title,
      content,
      author: author_id,
    };

    if (cover_image && cover_image.trim() !== "") {
      blog_data.cover_image = cover_image;
    }

    const created_blog = await blog.create(blog_data);

    if (created_blog) {
      return res
        .status(201)
        .json({ success: true, message: "blog created successfully!" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "blog creation failed!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "server error! blog creation failed!",
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const all_blogs = await blog
      .find({})
      .populate("author", "username profile_pic createdAt");
    return res.status(200).json({
      success: true,
      message: "blogs fetched successfully",
      data: all_blogs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "server error! blog fetch failed!",
    });
  }
};

const getSpecificBlog = async (req, res) => {
  try {
    const { blog_id } = req.params;

    if (!blog_id) {
      return res
        .status(404)
        .json({ success: false, message: "blog id not found!" });
    }

    const target_blog = await blog.findById(blog_id);

    if (target_blog) {
      return res
        .status(200)
        .json({ success: true, message: "blog details fetched!", target_blog });
    } else {
      return res.status(400).json({
        success: false,
        message: "blog no longer exists in the database!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "server error! blog fetch failed!",
    });
  }
};

const updateSpecificBlog = async (req, res) => {
  try {
    const { blog_id } = req.params;
    let { content, title, cover_image } = req.body;

    if (!blog_id) {
      return res
        .status(404)
        .json({ success: false, message: "blog id not found!" });
    }

    if (!content || !title) {
      return res.status(400).json({
        success: false,
        message: "blog content and title is required for update the blog",
      });
    }

    title = title?.trim();
    content = content?.trim();

    const target_blog = await blog.findById(blog_id);

    if (!target_blog) {
      return res.status(404).json({
        success: false,
        message: "blog no longer exist in the database",
      });
    }

    if (req.user.id !== target_blog.author.toString()) {
      return res.status(403).json({
        success: false,
        message: "only the author can modify the blog post",
      });
    }

    target_blog.title = title;
    target_blog.content = content;
    if (cover_image) target_blog.cover_image = cover_image;
    const response = await target_blog.save();

    if (response) {
      return res
        .status(200)
        .json({ success: true, message: "blog updated successfully" });
    } else {
      return res
        .status(400)
        .json({ success: true, message: "blog update process failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "server error! blog update process failed!",
    });
  }
};

const deleteSpecificBlog = async (req, res) => {
  try {
    const { blog_id } = req.params;

    if (!blog_id) {
      return res
        .status(404)
        .json({ success: false, message: "blog id not found!" });
    }

    const target_blog = await blog.findById(blog_id);

    if (!target_blog) {
      return res.status(404).json({
        success: false,
        message: "blog no longer exist in the database",
      });
    }

    if (req.user.id !== target_blog.author.toString()) {
      return res.status(403).json({
        success: false,
        message: "only the author can delete the blog post",
      });
    }

    const response = await blog.findByIdAndDelete(blog_id);

    if (response) {
      return res
        .status(200)
        .json({ success: true, message: "blog deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ success: true, message: "blog delete process failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "server error! blog delete process failed!",
    });
  }
};

module.exports = {
  getAllBlogs,
  getSpecificBlog,
  createNewBlog,
  updateSpecificBlog,
  deleteSpecificBlog,
};
