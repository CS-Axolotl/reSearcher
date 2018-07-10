import { Router } from 'express';
import passport from 'passport';
import SearchController from '../controllers/SearchController';
import QueryController from '../controllers/QueryController';
import ResultController from '../controllers/ResultController';
import strategies from '../passport';

const {
  generateToken, sendToken, verifyToken, authenticateUser,
} = require('../utils/token.utils');

strategies();

const router = Router();

const searchRouter = Router();
searchRouter.get('/', SearchController.get);

router.use('/api/search', searchRouter);

const queryRouter = Router();
queryRouter.post('/', QueryController.create);
queryRouter.get('/', QueryController.getAll);
queryRouter.get('/:id', QueryController.get);
queryRouter.delete('/:id', QueryController.delete);

router.use('/api/queries', verifyToken, queryRouter);

const resultRouter = Router();
resultRouter.get('/', ResultController.getAll);
// resultRouter.get('/:id', ResultController.get);
// resultRouter.delete('/:id', ResultController.delete);

router.use('/api/results', resultRouter);

router.route('/auth/google/callback')
  .post(passport.authenticate('google-token', { session: false }), (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id,
    };

    next();
  }, generateToken, sendToken);

router.get('/api/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/api/verify-session', authenticateUser, (req, res) => {
  res.setHeader('x-auth-token', req.session.ssid);
  return res.status(200).json(res.locals.user);
});

export default router;
