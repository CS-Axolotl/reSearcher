import { Router } from 'express';
import SearchController from '../controllers/SearchController';
import QueryController from '../controllers/QueryController';
import ResultController from '../controllers/ResultController';

const router = Router();

const searchRouter = Router();
searchRouter.get('/', SearchController.get);

router.use('/api/search', searchRouter);

const queryRouter = Router();
queryRouter.post('/', QueryController.create);
queryRouter.get('/', QueryController.getAll);
queryRouter.get('/:id', QueryController.get);
queryRouter.delete('/:id', QueryController.delete);

router.use('/api/queries', queryRouter);

const resultRouter = Router();
resultRouter.get('/', ResultController.getAll);
// resultRouter.get('/:id', ResultController.get);
// resultRouter.delete('/:id', ResultController.delete);

router.use('/api/results', resultRouter);

export default router;
