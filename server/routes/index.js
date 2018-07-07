import { Router } from 'express';
import SearchCtrl from '../controllers/SearchCtrl';
// import QueryCtrl from '../controllers/QueryCtrl';
// import ResultCtrl from '../controllers/ResultCtrl';

const router = Router();

const searchRouter = Router();
searchRouter.get('/', SearchCtrl.get);

router.use('/api/search', searchRouter);

// const queryRouter = Router();
// queryRouter.post('/', QueryCtrl.create);
// queryRouter.get('/', QueryCtrl.getAll);
// queryRouter.get('/:id', QueryCtrl.get);
// queryRouter.delete('/:id', QueryCtrl.delete);

// router.use('/api/queries', queryRouter);

// const resultRouter = Router();
// resultRouter.post('/', ResultCtrl.post);
// resultRouter.get('/', ResultCtrl.getAll);
// resultRouter.get('/:id', ResultCtrl.get);
// resultRouter.delete('/:id', ResultCtrl.delete);

// router.use('/api/results', resultRouter);

export default router;
