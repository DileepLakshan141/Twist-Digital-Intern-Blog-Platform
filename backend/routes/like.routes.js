const express = require("express");
const { createLikeInteraction } = require("../controllers/like.controller");
const router = express.Router();
const { tokenValidator } = require("../middleware/token_validator");

router.post("/add/:blog_id", tokenValidator, createLikeInteraction);

module.exports = router;
