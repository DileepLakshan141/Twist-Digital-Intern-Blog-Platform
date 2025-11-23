require("dotenv").config();
const { connect_db } = require("./config/db_connect");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

connect_db();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use("/twist_digital_blog/api/auth", require("./routes/auth.routes"));
app.use("/twist_digital_blog/api/users", require("./routes/user.routes"));
app.use("/twist_digital_blog/api/blogs", require("./routes/blog.routes"));
app.use("/twist_digital_blog/api/likes", require("./routes/like.routes"));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
