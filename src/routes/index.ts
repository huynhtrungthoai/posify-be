import { Router } from 'express';
import { json } from 'body-parser';

import { UserRouter } from './userRoute';
import { StoreRouter } from './storeRoute';
import { ProductRouter } from './productRoute';

const router = Router();

router.use(json());
router.use(UserRouter);
router.use(StoreRouter);
router.use(ProductRouter);

export default router;
