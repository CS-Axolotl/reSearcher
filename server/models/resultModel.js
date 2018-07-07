const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  id: Number,
  url: String,
  title: String,
  description: String,
  pagePublishDate: Date,
  tags: Array
});

module.exports = mongoose.model("Result", resultSchema);
