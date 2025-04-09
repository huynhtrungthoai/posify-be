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
exports.UserController = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const appError_1 = require("../helpers/appError");
const services_1 = require("../services");
const lodash_1 = require("lodash");
const config_1 = require("../helpers/config");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, verified, phone, role, password, avatar_url } = req.body;
    // Validate input
    if (!name || !email || !password) {
        (0, appError_1.BadRequestResponse)(res, 'Name, email, and password are required.');
        return;
    }
    try {
        const existingUser = yield services_1.UserService.findOne({ email });
        if (existingUser) {
            (0, appError_1.BadRequestResponse)(res, 'Email đã tồn tại');
            return;
        }
        const salt = yield (0, bcryptjs_1.genSalt)(config_1.AppConfig.SALT_ROUND);
        const hashPassword = yield (0, bcryptjs_1.hash)(password, salt);
        const user = services_1.UserService.create({
            name,
            email,
            password: hashPassword,
            role: role !== null && role !== void 0 ? role : 'USER',
            verified: verified !== null && verified !== void 0 ? verified : false,
            avatar_url: avatar_url !== null && avatar_url !== void 0 ? avatar_url : '',
            phone: phone !== null && phone !== void 0 ? phone : '',
            store_codes: [],
            role_codes: [],
        });
        (0, appError_1.SuccessResponse)(res, (0, lodash_1.omit)(user, ['password']));
        return;
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
        return;
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const currentUser = yield services_1.UserService.findOne({ email });
        if (!currentUser) {
            (0, appError_1.BadRequestResponse)(res, 'Email hoặc password không hợp lệ.');
            return;
        }
        const isSuccess = yield (0, bcryptjs_1.compare)(password, currentUser.password);
        if (!isSuccess) {
            (0, appError_1.BadRequestResponse)(res, 'Email hoặc password không hợp lệ.');
            return;
        }
        const payload = { id: currentUser.id, name: currentUser.name, email: currentUser.email };
        const access_token = (0, jsonwebtoken_1.sign)(payload, config_1.AppConfig.TOKEN_KEY, { expiresIn: '1d' });
        const refresh_token = (0, jsonwebtoken_1.sign)(payload, config_1.AppConfig.REFRESH_TOKEN_KEY, { expiresIn: '7d' });
        (0, appError_1.SuccessResponse)(res, { access_token, refresh_token });
        return;
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
        return;
    }
});
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    // Validate input
    if (!id) {
        (0, appError_1.BadRequestResponse)(res, 'User ID is required.');
        return;
    }
    if (!name && !email && !phone) {
        (0, appError_1.BadRequestResponse)(res, 'At least one field (name, email, or phone) is required to update.');
        return;
    }
    try {
        // Check if the user exists
        const existingUser = yield services_1.UserService.findOne({ id });
        if (!existingUser) {
            (0, appError_1.BadRequestResponse)(res, 'User does not exist.');
            return;
        }
        // Update the user profile
        const updatedUser = yield services_1.UserService.update(id, Object.assign(Object.assign({}, existingUser), req.body));
        (0, appError_1.SuccessResponse)(res, (0, lodash_1.omit)(updatedUser, ['password']));
        return;
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
        return;
    }
});
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const access_token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log(`🚀 ~ getMe ~ access_token:`, access_token);
    if (!access_token) {
        (0, appError_1.BadRequestResponse)(res, 'Token không hợp lệ.');
        return;
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(access_token, config_1.AppConfig.TOKEN_KEY);
        const user = yield services_1.UserService.findOne({ id: Number(decoded.id) });
        if (!user) {
            (0, appError_1.BadRequestResponse)(res, 'Người dùng không tồn tại.');
            return;
        }
        const { id, name, email } = user;
        (0, appError_1.SuccessResponse)(res, (0, lodash_1.omit)(user, ['password']));
        return;
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
        return;
    }
});
exports.UserController = {
    register,
    login,
    getMe,
    updateProfile,
};
//# sourceMappingURL=userController.js.map