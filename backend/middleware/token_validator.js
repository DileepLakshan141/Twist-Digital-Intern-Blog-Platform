const jwt = require("jsonwebtoken");

const tokenValidator = (req, res, next) => {
  try {
    const token = req.cookies?.blog_access_token;
    if (!token) {
      return res
        .status(404)
        .json({
          success: false,
          message: "access token expired! please sign in again!",
        });
    }
    const decoded_data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded_data;
    next();
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: false, message: "token validation check failed" });
  }
};

module.exports = { tokenValidator };
