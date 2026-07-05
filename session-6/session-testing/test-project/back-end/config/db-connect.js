const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = async () => {
    try {
  dotenv.config();
  await mongoose.connect(process.env.DB_MONGO_URI, {
    dbName: process.env.DB_NAME
  });
  console.log("MongoDB connected...");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}
};
module.exports = connectDB;