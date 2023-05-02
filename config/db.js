const mongoose = require("mongoose");
const url = require("./credentials").mongodb.url;

mongoose.set("strictQuery", "true");
const connectDB = mongoose
  .connect(url)
  .then(console.log("Connected to storyBooksDB successfully"));
 
module.exports = connectDB;