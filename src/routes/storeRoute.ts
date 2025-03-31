import { Router } from 'express';
import { requireAuthentication } from '../middleware/requireAuthentication';
import { StoreController } from '../controllers';

const router = Router();

const ROUTE_PREFIX = 'api';

router.get(`/${ROUTE_PREFIX}/stores`, requireAuthentication, StoreController.getStores);
router.post(`/${ROUTE_PREFIX}/stores`, requireAuthentication, StoreController.createStore);

export default router;
