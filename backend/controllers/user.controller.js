const user = require("../models/user.model");
const bcrypt = require("bcrypt");

const createNewUser = async (req, res) => {
  try {
    const { username, email, password, profile_pic } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "username, email and password pic is required",
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

const getUserDetailsById = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(404).json({
        success: false,
        message: "user id not found in params object",
      });
    }

    if (req.user.id !== user_id) {
      return res
        .status(403)
        .json({ success: false, message: "you are not authorized for this" });
    }

    const target_user = await user.findById(user_id);
    if (!target_user) {
      return res
        .status(404)
        .json({ success: false, message: "user not exists with provided id" });
    }

    return res.status(200).json({
      success: true,
      message: "user details fetched!",
      data: {
        username: target_user.username,
        email: target_user.email,
        profile_pic: target_user.profile_pic,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server side error occured! user fetch failed!",
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(404).json({
        success: false,
        message: "user id not found in params object",
      });
    }

    if (req.user.id !== user_id) {
      return res
        .status(403)
        .json({ success: false, message: "you are not authorized for this" });
    }

    const target_user = await user.findById(user_id);
    if (!target_user) {
      return res
        .status(404)
        .json({ success: false, message: "user not exists with provided id" });
    }

    const { username, password, profile_pic } = req.body;

    let hashed_password = null;
    if (password) {
      const salt_rounds = await bcrypt.genSalt(10);
      hashed_password = await bcrypt.hash(password, salt_rounds);
    }

    target_user.username = username ? username : target_user.username;
    target_user.profile_pic = profile_pic
      ? profile_pic
      : target_user.profile_pic;
    target_user.password = hashed_password
      ? hashed_password
      : target_user.password;

    const response = await target_user.save();

    if (response) {
      return res
        .status(200)
        .json({ success: true, message: "user details updated successfully!" });
    } else {
      return res
        .status(400)
        .json({ success: true, message: "user details update failed!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server side error occured! user update failed!",
    });
  }
};

module.exports = {
  createNewUser,
  getUserDetailsById,
  updateUserById,
};
