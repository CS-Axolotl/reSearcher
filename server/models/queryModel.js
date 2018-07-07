const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QueryModel = new Schema({
  id: Number,
  date: Date,
  results: Array,
});

module.exports = mongoose.model('Query', QueryModel);
