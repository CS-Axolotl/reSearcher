import Session from '../models/SessionModel';

const SessionController = {};

// SessionController.isLoggedIn = (req, res, next) => {
//   Session.find({ cookieId: req.cookies.ssid }, (err, sessions) => {
//     if (err || !sessions[0]) {
//       res.redirect('/signup');
//     } else {
//       next();
//     }
//   });
// };

// SessionController.startSession = (req, res, next) => {
//   Session.create({ cookieId: res.locals.id }, (err) => {
//     if (err) console.log('Session error', err);
//     else console.log('New Session');
//   });
//   next();
// };

module.exports = SessionController;
