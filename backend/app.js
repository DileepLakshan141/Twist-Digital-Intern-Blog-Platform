require("dotenv").config();
const { connect_db } = require("./config/db_connect");
const express = require("express");
const cors = require("cors");
const { tokenValidator } = require("./middleware/token_validator");

connect_db();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/twist_digital_blog/api/auth", require("./routes/auth.routes"));
app.use("/twist_digital_blog/api/users", require("./routes/user.routes"));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
