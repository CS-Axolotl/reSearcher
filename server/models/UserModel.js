import mongoose, { Schema } from 'mongoose';


const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: Schema.Types.Mixed},
  email: {
    type: String, required: true,
    trim: true, unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  googleProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  },
  queries: [{ type: Schema.Types.ObjectId, ref: 'Query' }],
});

UserSchema.set('toJSON', { getters: true, virtuals: true });

UserSchema.statics.upsertGoogleUser = function (accessToken, refreshToken, profile, cb) {
  var that = this;
  return this.findOne({
    'googleProvider.id': profile.id
  }, function (err, user) {
    // no user was found, lets create a new one
    if (!user) {
      var newUser = new that({
        username: profile.displayName,
        email: profile.emails[0].value,
        googleProvider: {
          id: profile.id,
          token: accessToken
        }
      });

      newUser.save(function (error, savedUser) {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    } else {
      return cb(err, user);
    }
  });
};

// userSchema.pre('save', function (next) {
//   const user = this;
//   user.password = bcrypt.hashSync(user.password, SALT_WORK_FACTOR);
//   next();
// });

// userSchema.methods.comparePassword = function (candidatePassword) {
//   return bcrypt.compareSync(candidatePassword, this.password);
// };

module.exports = mongoose.model('User', UserSchema);
