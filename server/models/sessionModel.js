const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now },
});

module.exports = mongoose.model('Session', SessionSchema);
