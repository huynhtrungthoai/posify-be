"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRouter = void 0;
const express_1 = require("express");
const authentication_1 = require("../middleware/authentication");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
const ROUTE_PREFIX = 'api';
router.get(`/${ROUTE_PREFIX}/stores`, authentication_1.authentication, controllers_1.StoreController.getStores);
router.post(`/${ROUTE_PREFIX}/store`, authentication_1.authentication, controllers_1.StoreController.createStore);
router.patch(`/${ROUTE_PREFIX}/store/:id`, authentication_1.authentication, controllers_1.StoreController.updateStore);
exports.StoreRouter = router;
//# sourceMappingURL=storeRoute.js.map