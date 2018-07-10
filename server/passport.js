const passport = require('passport');
import User from './models/UserModel';
const GoogleTokenStrategy = require('passport-google-token').Strategy;

const strategies = () => passport.use(new GoogleTokenStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  User.upsertGoogleUser(
    accessToken,
    refreshToken,
    profile,
    (err, user) => done(err, user),
  );
}));

export default strategies;