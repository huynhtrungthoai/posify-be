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
exports.StoreService = void 0;
const dataSource_1 = require("../dataSource");
const Store_1 = require("../entity/Store");
const storeRepository = dataSource_1.AppDataSource.getRepository(Store_1.Store);
const findOne = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield storeRepository.findOneBy(query);
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield storeRepository.find();
});
const create = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield storeRepository.save(storeRepository.create(input));
});
const update = (id, store) => __awaiter(void 0, void 0, void 0, function* () {
    yield storeRepository.update(id, store);
    return yield storeRepository.findOne({ where: { id: Number(id) } });
});
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield storeRepository.findOne({ where: { id: Number(id) } });
    if (!store) {
        throw new Error(`Store with id ${id} not found`);
    }
    yield storeRepository.remove(store);
    return store;
});
exports.StoreService = {
    findOne,
    findAll,
    create,
    update,
    remove,
};
//# sourceMappingURL=storeService.js.map