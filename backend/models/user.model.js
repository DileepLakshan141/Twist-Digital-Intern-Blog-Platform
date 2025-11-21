const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "valid username is required"],
    },
    email: {
      type: String,
      required: [true, "valid email address is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "valid password is required"],
    },
    profile_pic: {
      type: String,
      default:
        "https://res.cloudinary.com/dixbfipcw/image/upload/v1763565328/profile_aimu7y.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
