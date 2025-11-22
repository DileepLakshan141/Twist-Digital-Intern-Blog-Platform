const express = require("express");
const router = express.Router();
const {
  createNewUser,
  getUserDetailsById,
  updateUserById,
} = require("../controllers/user.controller");
const { tokenValidator } = require("../middleware/token_validator");

router.post("/signup", createNewUser);
router.get("/details/:user_id", tokenValidator, getUserDetailsById);
router.put("/update/:user_id", tokenValidator, updateUserById);

module.exports = router;
