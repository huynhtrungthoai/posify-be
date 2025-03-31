import { Router } from 'express';
import { authentication } from '../middleware/authentication';
import { StoreController } from '../controllers';

const router = Router();

const ROUTE_PREFIX = 'api';

router.get(`/${ROUTE_PREFIX}/stores`, authentication, StoreController.getStores);
router.post(`/${ROUTE_PREFIX}/store`, authentication, StoreController.createStore);
router.patch(`/${ROUTE_PREFIX}/store/:id`, authentication, StoreController.updateStore);

export default router;
