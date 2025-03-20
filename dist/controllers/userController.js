"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUserProfile = exports.login = exports.register = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const appError_1 = require("../helpers/appError");
const userService_1 = require("../services/userService");
dotenv.config();
const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);
const TOKEN_KEY = process.env.TOKEN_KEY;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield (0, userService_1.findUser)({ email });
        if (existingUser) {
            (0, appError_1.BadRequestResponse)(res, 'Email đã tồn tại');
        }
        const salt = yield bcrypt.genSalt(SALT_ROUND);
        const hashPassword = yield bcrypt.hash(password, salt);
        const user = (0, userService_1.createUser)({
            name,
            email,
            password: hashPassword,
        });
        (0, appError_1.SuccessResponse)(res, user);
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const currentUser = yield (0, userService_1.findUser)({ email });
        if (!currentUser) {
            (0, appError_1.BadRequestResponse)(res, 'Email hoặc password không hợp lệ.');
        }
        const isSuccess = yield bcrypt.compare(password, currentUser.password);
        if (!isSuccess) {
            (0, appError_1.BadRequestResponse)(res, 'Email hoặc password không hợp lệ.');
        }
        const payload = { id: currentUser.id, name: currentUser.name, email: currentUser.email };
        const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '1d' });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY, { expiresIn: '7d' });
        (0, appError_1.SuccessResponse)(res, { token, refreshToken });
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
    }
});
exports.login = login;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        (0, appError_1.BadRequestResponse)(res, 'Token không hợp lệ.');
    }
    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        const user = yield (0, userService_1.findUser)({ id: Number(decoded.id) });
        if (!user) {
            (0, appError_1.BadRequestResponse)(res, 'Người dùng không tồn tại.');
        }
        const { id, name, email } = user;
        (0, appError_1.SuccessResponse)(res, { id, name, email });
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
    }
});
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=userController.js.map