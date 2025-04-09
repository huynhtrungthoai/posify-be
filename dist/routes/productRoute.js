"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const authentication_1 = require("../middleware/authentication");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
const ROUTE_PREFIX = 'api';
router.get(`/${ROUTE_PREFIX}/products`, authentication_1.authentication, controllers_1.ProductController.getProducts);
router.post(`/${ROUTE_PREFIX}/product`, authentication_1.authentication, controllers_1.ProductController.createProduct);
router.patch(`/${ROUTE_PREFIX}/product/:id`, authentication_1.authentication, controllers_1.ProductController.updateProduct);
exports.ProductRouter = router;
//# sourceMappingURL=productRoute.js.map