const express = require("express");
const router = express.Router();
const { createNewUser } = require("../controllers/user.controller");

router.post("/signup", createNewUser);

module.exports = router;
