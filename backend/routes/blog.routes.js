const express = require("express");
const {
  getAllBlogs,
  getRecentBlogs,
  getSpecificBlog,
  createNewBlog,
  updateSpecificBlog,
  deleteSpecificBlog,
  searchBlogs,
  getAllBlogsBelongToUser,
} = require("../controllers/blog.controller");
const router = express.Router();
const { tokenValidator } = require("../middleware/token_validator");

router.get("/all", getAllBlogs);
router.get("/recent", getRecentBlogs);
router.get("/myblogs/:profile_id", tokenValidator, getAllBlogsBelongToUser);
router.get("/:blog_id", getSpecificBlog);
router.post("/create", tokenValidator, createNewBlog);
router.post("/search", searchBlogs);
router.put("/update/:blog_id", tokenValidator, updateSpecificBlog);
router.delete("/delete/:blog_id", tokenValidator, deleteSpecificBlog);

module.exports = router;
