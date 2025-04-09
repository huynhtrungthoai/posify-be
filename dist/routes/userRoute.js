"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const authentication_1 = require("../middleware/authentication");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
const ROUTE_PREFIX = 'api';
router.post(`/${ROUTE_PREFIX}/register`, controllers_1.UserController.register);
router.post(`/${ROUTE_PREFIX}/login`, controllers_1.UserController.login);
router.get(`/${ROUTE_PREFIX}/me`, authentication_1.authentication, controllers_1.UserController.getMe);
router.patch(`/${ROUTE_PREFIX}/user/:id`, authentication_1.authentication, controllers_1.UserController.updateProfile);
exports.UserRouter = router;
//# sourceMappingURL=userRoute.js.map