import { Router } from 'express';
import * as bodyParser from 'body-parser';

import UserRouter from '../routes/userRoute';
import StoreRouter from '../routes/storeRoute';

const router = Router();

router.use(bodyParser.json());
router.use(UserRouter);
router.use(StoreRouter);

export default router;
