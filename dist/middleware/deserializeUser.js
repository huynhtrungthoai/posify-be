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
exports.deserializeUser = void 0;
const appError_1 = require("../helpers/appError");
const userService_1 = require("../services/userService");
const dotenv = __importStar(require("dotenv"));
const jwt = __importStar(require("jsonwebtoken"));
dotenv.config();
const TOKEN_KEY = process.env.TOKEN_KEY;
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authHeader = req.headers.authorization;
        const accessToken = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer')) ? authHeader.split(' ')[1] : (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token;
        if (!accessToken) {
            (0, appError_1.UnauthorizedResponse)(res, 'You are not logged in');
        }
        const decoded = jwt.verify(accessToken, TOKEN_KEY);
        const user = yield (0, userService_1.findUser)({ id: Number(decoded === null || decoded === void 0 ? void 0 : decoded.id) });
        if (!user || !decoded) {
            (0, appError_1.UnauthorizedResponse)(res, 'Invalid token or session has expired');
        }
        // Add user to res.locals
        res.locals.user = user;
        next();
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
    }
});
exports.deserializeUser = deserializeUser;
//# sourceMappingURL=deserializeUser.js.map