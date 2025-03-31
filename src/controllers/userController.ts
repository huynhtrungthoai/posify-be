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

const register = async (req: Request, res: Response) => {
    const { name, email, verified, phone, role, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        BadRequestResponse(res, 'Name, email, and password are required.');
        return;
    }

    try {
        const existingUser = await findUser({ email });
        if (existingUser) {
            BadRequestResponse(res, 'Email đã tồn tại');
            return;
        }

        const salt = await bcrypt.genSalt(SALT_ROUND);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = createUser({
            name,
            email,
            password: hashPassword,
            role,
            verified,
            avatar_url: '',
            phone,
            store_codes: [],
            role_codes: [],
        });
        SuccessResponse(res, user);
        return;
    } catch (err) {
        console.log(`🚀 ~ register ~ err:`, err);
        ErrorResponse(res, err.message);
        return;
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const currentUser = await findUser({ email });

        if (!currentUser) {
            BadRequestResponse(res, 'Email hoặc password không hợp lệ.');
            return;
        }

        const isSuccess = await bcrypt.compare(password, currentUser.password);
        if (!isSuccess) {
            BadRequestResponse(res, 'Email hoặc password không hợp lệ.');
            return;
        }

        const payload = { id: currentUser.id, name: currentUser.name, email: currentUser.email };
        const access_token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '1d' });
        const refresh_token = jwt.sign(payload, REFRESH_TOKEN_KEY, { expiresIn: '7d' });
        SuccessResponse(res, { access_token, refresh_token });
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};

const getUserProfile = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        BadRequestResponse(res, 'Token không hợp lệ.');
        return;
    }

    try {
        const decoded = jwt.verify(token, TOKEN_KEY) as { id: string };
        const user = await findUser({ id: Number(decoded.id) });

        if (!user) {
            BadRequestResponse(res, 'Người dùng không tồn tại.');
            return;
        }

        const { id, name, email } = user;
        SuccessResponse(res, { id, name, email });
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};

export const UserController = {
    register,
    login,
    getUserProfile,
};
