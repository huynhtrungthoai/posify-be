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
exports.ProductService = void 0;
const Product_1 = require("../entity/Product");
const dataSource_1 = require("../dataSource");
const productRepository = dataSource_1.AppDataSource.getRepository(Product_1.Product);
const findOne = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productRepository.findOneBy(query);
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield productRepository.find();
});
const create = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productRepository.save(productRepository.create(input));
});
const update = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    yield productRepository.update(id, product);
    return yield productRepository.findOne({ where: { id: Number(id) } });
});
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productRepository.findOne({ where: { id: Number(id) } });
    if (!product) {
        throw new Error(`product with id ${id} not found`);
    }
    yield productRepository.remove(product);
    return product;
});
exports.ProductService = {
    findOne,
    findAll,
    create,
    update,
    remove,
};
//# sourceMappingURL=productService.js.map