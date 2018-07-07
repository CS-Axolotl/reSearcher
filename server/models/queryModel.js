import mongoose, { Schema } from 'mongoose';

const QueryModel = new Schema({
  created_at: { type: Date, default: Date.now() },
  results: [{ type: Schema.Types.ObjectId, ref: 'Result' }],
  searchText: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Query', QueryModel);
