const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: Schema.Types.Mixed, required: true },
  email: String,
  results: Array,
  keywords: Array,
});

// userSchema.pre('save', function (next) {
//   const user = this;
//   user.password = bcrypt.hashSync(user.password, SALT_WORK_FACTOR);
//   next();
// });

// userSchema.methods.comparePassword = function (candidatePassword) {
//   return bcrypt.compareSync(candidatePassword, this.password);
// };

module.exports = mongoose.model('User', userSchema);
