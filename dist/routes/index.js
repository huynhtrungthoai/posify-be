"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = require("body-parser");
const userRoute_1 = require("./userRoute");
const storeRoute_1 = require("./storeRoute");
const productRoute_1 = require("./productRoute");
const router = (0, express_1.Router)();
router.use((0, body_parser_1.json)());
router.use(userRoute_1.UserRouter);
router.use(storeRoute_1.StoreRouter);
router.use(productRoute_1.ProductRouter);
exports.default = router;
//# sourceMappingURL=index.js.map