import mongoose, { Schema } from 'mongoose';
import Result from './ResultModel';

const QueryModel = new Schema({
  created_at: { type: Date, default: Date.now() },
  results: [{ type: Schema.Types.ObjectId, ref: 'Result' }],
  searchText: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Query', QueryModel);
