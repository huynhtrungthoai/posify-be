import { NextFunction, Request, Response } from 'express';
import { ErrorResponse, UnauthorizedResponse } from '../helpers/appError';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../services';
dotenv.config();

const TOKEN_KEY = process.env.TOKEN_KEY;
export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader?.startsWith('Bearer') ? authHeader.split(' ')[1] : req.cookies?.access_token;

        if (!accessToken) {
            UnauthorizedResponse(res, 'Vui lòng đăng nhập.');
            return;
        }

        let decoded;
        try {
            decoded = jwt.verify(accessToken, TOKEN_KEY) as { id: string };
        } catch (err) {
            if (err.name === 'JsonWebTokenError') {
                UnauthorizedResponse(res, 'Token không hợp lệ.');
            } else if (err.name === 'TokenExpiredError') {
                UnauthorizedResponse(res, 'Token đã hết hạn, vui lòng đăng nhập lại.');
            } else {
                ErrorResponse(res, 'Lỗi xác thực token');
            }
            return;
        }

        const user = await UserService.findOne({ id: Number(decoded?.id) });

        if (!user) {
            UnauthorizedResponse(res, 'Không tìm thấy người dùng hoặc token đã hết hạn.');
            return;
        }

        // Add user to res.locals
        res.locals.user = user;

        next();
    } catch (err: any) {
        ErrorResponse(res, 'An unexpected error occurred');
        return;
    }
};
