import mongoose, { Schema } from 'mongoose';

const ResultSchema = new Schema({
  link: String,
  htmlTitle: String,
  htmlSnippet: String,
  tags: Array,
  query_id: { type: Schema.Types.ObjectId, ref: 'Query' },
});

const QueryModel = new Schema({
  created_at: { type: Date, default: Date.now() },
  results: [ResultSchema],
  searchText: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Query', QueryModel);
