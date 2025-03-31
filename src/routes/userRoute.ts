import { Router } from 'express';
import * as UserController from '../controllers/userController';
import { requireAuthentication } from '../middleware/requireAuthentication';

const router = Router();

const ROUTE_PREFIX = 'api';

router.post(`/${ROUTE_PREFIX}/register`, UserController.register);
router.post(`/${ROUTE_PREFIX}/login`, UserController.login);
router.get(`/${ROUTE_PREFIX}/me`, requireAuthentication, UserController.getUserProfile);

export default router;
