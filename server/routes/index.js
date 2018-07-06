import { Router } from 'express';

const router = Router();

const searchRouter = Router();
// searchRouter.get('/', searchController.get);

router.use('/api/search', searchRouter);

export default router;
