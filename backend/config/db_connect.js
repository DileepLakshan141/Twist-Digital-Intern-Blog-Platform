const mongoose = require("mongoose");

const connect_db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(
      `Successfully connected to the database: ${conn.connection.name}`
    );
  } catch (error) {
    console.log("Error occured while conneecting to the database.", error);
    process.exit(1);
  }
};

module.exports = { connect_db };
