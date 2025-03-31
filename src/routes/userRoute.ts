import { Router } from 'express';
import { authentication } from '../middleware/authentication';
import { UserController } from '../controllers';

const router = Router();

const ROUTE_PREFIX = 'api';

router.post(`/${ROUTE_PREFIX}/register`, UserController.register);
router.post(`/${ROUTE_PREFIX}/login`, UserController.login);
router.get(`/${ROUTE_PREFIX}/me`, authentication, UserController.getMe);
router.patch(`/${ROUTE_PREFIX}/user/:id`, authentication, UserController.updateProfile);

export default router;
