const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const queryModel = new Schema({
  id: Number,
  date: Date,
  results: Array,
});

module.exports = mongoose.model('Query', queryModel);
