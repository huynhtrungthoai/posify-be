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
exports.authentication = void 0;
const config_1 = require("./../helpers/config");
const appError_1 = require("../helpers/appError");
const jsonwebtoken_1 = require("jsonwebtoken");
const services_1 = require("../services");
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authHeader = req.headers.authorization;
        const accessToken = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer')) ? authHeader.split(' ')[1] : (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token;
        if (!accessToken) {
            (0, appError_1.UnauthorizedResponse)(res, 'Vui lòng đăng nhập.');
            return;
        }
        let decoded;
        try {
            decoded = (0, jsonwebtoken_1.verify)(accessToken, config_1.AppConfig.TOKEN_KEY);
        }
        catch (err) {
            if (err.name === 'JsonWebTokenError') {
                (0, appError_1.UnauthorizedResponse)(res, 'Token không hợp lệ.');
            }
            else if (err.name === 'TokenExpiredError') {
                (0, appError_1.UnauthorizedResponse)(res, 'Token đã hết hạn, vui lòng đăng nhập lại.');
            }
            else {
                (0, appError_1.ErrorResponse)(res, 'Lỗi xác thực token');
            }
            return;
        }
        const user = yield services_1.UserService.findOne({ id: Number(decoded === null || decoded === void 0 ? void 0 : decoded.id) });
        if (!user) {
            (0, appError_1.UnauthorizedResponse)(res, 'Không tìm thấy người dùng hoặc token đã hết hạn.');
            return;
        }
        // Add user to res.locals
        res.locals.user = user;
        next();
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, 'An unexpected error occurred');
        return;
    }
});
exports.authentication = authentication;
//# sourceMappingURL=authentication.js.map