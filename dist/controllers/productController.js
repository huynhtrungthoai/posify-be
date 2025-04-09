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
exports.ProductController = void 0;
const appError_1 = require("../helpers/appError");
const services_1 = require("../services");
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield services_1.ProductService.findAll();
        (0, appError_1.SuccessResponse)(res, products);
        return;
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
        return;
    }
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, sku, desc, image_url, cost, price, inventory, type, is_ingredient, ingredients, store_ids } = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    // Validate input
    if (!name) {
        (0, appError_1.BadRequestResponse)(res, 'Tên sản phẩm không được bỏ trống');
        return;
    }
    try {
        // Create a new store
        const store = yield services_1.ProductService.create({
            name: name,
            sku: sku,
            desc: desc,
            image_url: image_url,
            cost: cost,
            price: price,
            inventory: inventory,
            type: type,
            is_ingredient: is_ingredient !== null && is_ingredient !== void 0 ? is_ingredient : false,
            ingredients: ingredients,
            store_ids: store_ids,
        });
        (0, appError_1.SuccessResponse)(res, store);
        return;
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
        return;
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingStore = yield services_1.ProductService.findOne({ id });
        if (!existingStore) {
            (0, appError_1.BadRequestResponse)(res, 'Cửa hàng không tồn tại');
            return;
        }
        // Update the store
        const updatedStore = yield services_1.ProductService.update(id, Object.assign(Object.assign({}, existingStore), req.body));
        (0, appError_1.SuccessResponse)(res, updatedStore);
        return;
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
        return;
    }
});
exports.ProductController = { getProducts, createProduct, updateProduct };
//# sourceMappingURL=productController.js.map