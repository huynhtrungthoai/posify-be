"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
const appError_1 = require("../helpers/appError");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../helpers/config");
const services_1 = require("../services");
const getStores = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield services_1.StoreService.findAll();
        (0, appError_1.SuccessResponse)(res, stores);
        return;
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
        return;
    }
});
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = req.body;
    const access_token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    // Validate input
    if (!name) {
        (0, appError_1.BadRequestResponse)(res, 'Tên cửa hàng không được bỏ trống');
        return;
    }
    try {
        // Check if a store with the same code already exists
        const store_code = name.toLowerCase().replace(/\s+/g, '-');
        const existingStore = yield services_1.StoreService.findOne({ code: store_code });
        if (existingStore) {
            (0, appError_1.BadRequestResponse)(res, 'Cửa hàng đã tồn tại!');
            return;
        }
        const decoded_token = (0, jsonwebtoken_1.verify)(access_token, config_1.AppConfig.TOKEN_KEY);
        // Create a new store
        const store = yield services_1.StoreService.create(Object.assign({ name, code: store_code, user_id: decoded_token === null || decoded_token === void 0 ? void 0 : decoded_token.id }, req.body));
        (0, appError_1.SuccessResponse)(res, store);
        return;
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
        return;
    }
});
const updateStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, code } = req.body;
    // Validate input
    if (!id) {
        (0, appError_1.BadRequestResponse)(res, 'Store ID is required.');
        return;
    }
    if (!name && !code) {
        (0, appError_1.BadRequestResponse)(res, 'At least one field (name or code) is required to update.');
        return;
    }
    try {
        // Check if the store exists
        const existingStore = yield services_1.StoreService.findOne({ id });
        if (!existingStore) {
            (0, appError_1.BadRequestResponse)(res, 'Cửa hàng không tồn tại');
            return;
        }
        // Update the store
        const updatedStore = yield services_1.StoreService.update(id, Object.assign(Object.assign({}, existingStore), req.body));
        (0, appError_1.SuccessResponse)(res, updatedStore);
        return;
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
        return;
    }
});
exports.StoreController = { getStores, createStore, updateStore };
//# sourceMappingURL=storeController.js.map