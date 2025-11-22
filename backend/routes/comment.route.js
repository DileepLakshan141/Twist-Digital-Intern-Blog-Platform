const express = require("express");
const router = express.Router();
const {
  createComment,
  getAllCommentsForBlog,
} = require("../controllers/comment.controller");
const { tokenValidator } = require("../middleware/token_validator");

router.post("/create", tokenValidator, createComment);
router.get("/blog/:blog_id", getAllCommentsForBlog);

module.exports = router;
