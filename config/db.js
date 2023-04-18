const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    mongoose.connection.on("connected", () => {
      console.log(`Connected to MongoDB ${process.env.MONGO_URL}`);
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error connecting to MongoDB", err);
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
