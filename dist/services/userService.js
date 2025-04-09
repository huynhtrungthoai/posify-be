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
exports.UserService = void 0;
const dataSource_1 = require("../dataSource");
const User_1 = require("../entity/User");
const userRepository = dataSource_1.AppDataSource.getRepository(User_1.User);
const create = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.save(userRepository.create(input));
});
const update = (id, store) => __awaiter(void 0, void 0, void 0, function* () {
    yield userRepository.update(id, store);
    return yield userRepository.findOne({ where: { id: Number(id) } });
});
const findOne = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findOneBy(query);
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.find();
});
exports.UserService = {
    create,
    update,
    findOne,
    findAll,
};
//# sourceMappingURL=userService.js.map