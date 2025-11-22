const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token_generator");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "valid email and password is required!",
      });
    }

    const target_user = await user.findOne({ email });
    if (!target_user) {
      return res
        .status(404)
        .json({ success: false, message: "user not exists" });
    }

    const password_check = await bcrypt.compare(password, target_user.password);

    if (!password_check) {
      return res
        .status(400)
        .json({ success: false, message: "invalid email address or password" });
    }

    const user_payload = { id: target_user._id, email: target_user.email };
    const access_token = generateToken(user_payload);

    res.cookie("blog_access_token", access_token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      maxAge: 1000 * 60 * 30,
      sameSite: "Strict",
    });

    return res.status(200).json({
      success: true,
      message: `login successful! welcome ${target_user.username}`,
      user: {
        id: target_user._id,
        email: target_user.email,
        username: target_user.username,
        profile_pic: target_user.profile_pic,
        access_token,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "invalid email address or password" });
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("blog_access_token", "", {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: "Strict",
      expires: new Date(0),
    });

    return res.status(200).json({
      success: true,
      message: "successfully logged out!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "server error while logging out",
    });
  }
};

module.exports = { loginUser, logoutUser };
