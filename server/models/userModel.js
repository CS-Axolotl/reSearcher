import mongoose, { Schema } from 'mongoose';

// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: Schema.Types.Mixed, required: true },
  email: { type: String, required: true, unique: true },
  queries: [{ type: Schema.Types.ObjectId, ref: 'Query' }],
});

// userSchema.pre('save', function (next) {
//   const user = this;
//   user.password = bcrypt.hashSync(user.password, SALT_WORK_FACTOR);
//   next();
// });

// userSchema.methods.comparePassword = function (candidatePassword) {
//   return bcrypt.compareSync(candidatePassword, this.password);
// };

module.exports = mongoose.model('User', UserSchema);
