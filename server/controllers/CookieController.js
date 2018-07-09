const sessionController = require('./SessionController');

const CookieController = {};
CookieController.setCookie = setCookie;
CookieController.setSSIDCookie = setSSIDCookie;

// function setCookie(req, res, next) {
//   res.cookie('testing', 'hello');
//   res.cookie('secret', Math.random() * 100);
//   next();
// }
// function setSSIDCookie(req, res, next) {
//   res.cookie('ssid', res.locals.id, { httpOnly: true });
//   next();
// }

module.exports = CookieController;
