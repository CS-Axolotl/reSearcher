const User = require("./../models/userModel");
const CookieController = require("./CookieController");
const SessionController = require("./SessionController");

const UserController = {};

// UserController.getAll = (next) => {
//   User.find({}, next);
// };

// UserController.create = (req, res, next) => {
// const {
//  id, username, password, email
// } = req.body;
//   User.create(
//     { id, username, password, email },
//     (err, user) => {
//       if (err) {
//         res.status(400);
//         res.render('./../client/signup', { error: 'Error' });
//       } else {
//         next();
//       }
//     },
//   );
// };

// UserController.verify = (req, res, next) => {
//   if (
//     typeof req.body.username === ("string" || "number") &&
//     typeof req.body.password === ("string" || "number")
//   ) {
//     User.findOne({ username: req.body.username }, (err, user) => {
//       if (err || !user) {
//         res.redirect("/signup");
//       } else {
//         if (user.comparePassword(req.body.password)) {
//           res.locals.id = user._id;
//           return next();
//         }
//         res.redirect("/signup");
//       }
//     });
//   } else {
//     res.redirect("/signup");
//   }
// };

module.exports = UserController;