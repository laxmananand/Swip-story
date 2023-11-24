const mongoose = require("mongoose");
const connectDb = () => {
  try {
    mongoose.connect(
      "mongodb+srv://laxman7291:PwOXNewOPc0VsFPt@swipstory.3j4e6sr.mongodb.net/?retryWrites=true&w=majority"
    );
    const connection = mongoose.connection;
    connection.on("error", (error) => {
      console.log("failed to connect mongoDb", error);
    });
    connection.once("open", () => {
      console.log("connected to Mongodb");
    });
  } catch (err) {
    console.log("Failed to connect MongoDb", err);
  }
};
module.exports = connectDb;
