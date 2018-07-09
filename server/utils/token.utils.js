
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';

const createToken = auth => jwt.sign(
  {
    id: auth.id,
  },
  'hairclips4life',
  {
    expiresIn: 60 * 120,
  },
);

module.exports = {
  generateToken: (req, res, next) => {
    req.token = createToken(req.auth);
    return next();
  },
  sendToken: (req, res) => {
    req.session.ssid = req.token;
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  },
  verifyToken: (req, res, next) => {
    if (req.session.ssid) {
      jwt.verify(req.session.ssid, 'hairclips4life', (err, decoded) => {
        if (decoded.id) {
          res.locals.userId = decoded.id;
          return next();
        }
      });
    }
    return res.redirect('/');
  },
  authenticateUser: (req, res, next) => {
    if (req.session.ssid) {
      jwt.verify(req.session.ssid, 'hairclips4life', (err, decoded) => {
        if (decoded.id) {
          User.findById(decoded.id, (error, user) => {
            if (!user || error) return res.sendStatus(404);
            res.locals.user = user;
            return next();
          });
        }
      });
    }
  },
};
