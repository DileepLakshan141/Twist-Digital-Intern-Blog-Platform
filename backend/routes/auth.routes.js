const express = require("express");
const router = express.Router();
const { loginUser, logoutUser } = require("../controllers/auth.controller");

router.post("/signin", loginUser);
router.post("/signout", logoutUser);

module.exports = router;
