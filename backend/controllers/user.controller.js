const user = require("../models/user.model");
const bcrypt = require("bcrypt");

const createNewUser = async (req, res) => {
  try {
    const { username, email, password, profile_pic } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "username, email , password and profile pic is required",
      });
    }

    const salt_rounds = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt_rounds);

    const created_user = await user.create({
      username,
      email,
      password: hashed_password,
      profile_pic: profile_pic === "" ? null : profile_pic,
    });

    if (created_user) {
      return res
        .status(201)
        .json({ success: true, message: "User successfully created!" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "User creation operation failed!" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error! User creation operation failed!",
    });
  }
};

module.exports = {
  createNewUser,
};
