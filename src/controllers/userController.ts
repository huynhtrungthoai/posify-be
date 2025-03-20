import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { BadRequestResponse, ErrorResponse, SuccessResponse } from '../helpers/appError';
import { createUser, findUser } from '../services/userService';
dotenv.config();

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);
const TOKEN_KEY = process.env.TOKEN_KEY;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await findUser({ email });

        if (existingUser) {
            BadRequestResponse(res, 'Email đã tồn tại');
        }

        const salt = await bcrypt.genSalt(SALT_ROUND);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = createUser({
            name,
            email,
            password: hashPassword,
        });
        SuccessResponse(res, user);
    } catch (err) {
        ErrorResponse(res, err.message);
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const currentUser = await findUser({ email });

        if (!currentUser) {
            BadRequestResponse(res, 'Email hoặc password không hợp lệ.');
        }

        const isSuccess = await bcrypt.compare(password, currentUser.password);
        if (!isSuccess) {
            BadRequestResponse(res, 'Email hoặc password không hợp lệ.');
        }

        const payload = { id: currentUser.id, name: currentUser.name, email: currentUser.email };
        const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '1d' });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY, { expiresIn: '7d' });
        SuccessResponse(res, { token, refreshToken });
    } catch (err) {
        ErrorResponse(res, err.message);
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        BadRequestResponse(res, 'Token không hợp lệ.');
    }

    try {
        const decoded = jwt.verify(token, TOKEN_KEY) as { id: string };
        const user = await findUser({ id: Number(decoded.id) });

        if (!user) {
            BadRequestResponse(res, 'Người dùng không tồn tại.');
        }

        const { id, name, email } = user;
        SuccessResponse(res, { id, name, email });
    } catch (err) {
        ErrorResponse(res, err.message);
    }
};
