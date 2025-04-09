import { Request, Response } from 'express';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { BadRequestResponse, ErrorResponse, SuccessResponse } from '../helpers/appError';
import { UserService } from '../services';
import { omit } from 'lodash';
import { AppConfig } from '../helpers/config';

const register = async (req: Request, res: Response) => {
    const { name, email, verified, phone, role, password, avatar_url } = req.body;

    // Validate input
    if (!name || !email || !password) {
        BadRequestResponse(res, 'Name, email, and password are required.');
        return;
    }

    try {
        const existingUser = await UserService.findOne({ email });
        if (existingUser) {
            BadRequestResponse(res, 'Email đã tồn tại');
            return;
        }

        const salt = await genSalt(AppConfig.SALT_ROUND);
        const hashPassword = await hash(password, salt);
        const user = UserService.create({
            name,
            email,
            password: hashPassword,
            role: role ?? 'USER',
            verified: verified ?? false,
            avatar_url: avatar_url ?? '',
            phone: phone ?? '',
            store_codes: [],
            role_codes: [],
        });
        SuccessResponse(res, omit(user, ['password']));
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const currentUser = await UserService.findOne({ email });

        if (!currentUser) {
            BadRequestResponse(res, 'Email hoặc password không hợp lệ.');
            return;
        }

        const isSuccess = await compare(password, currentUser.password);
        if (!isSuccess) {
            BadRequestResponse(res, 'Email hoặc password không hợp lệ.');
            return;
        }

        const payload = { id: currentUser.id, name: currentUser.name, email: currentUser.email };
        const access_token = sign(payload, AppConfig.TOKEN_KEY, { expiresIn: '1d' });
        const refresh_token = sign(payload, AppConfig.REFRESH_TOKEN_KEY, { expiresIn: '7d' });
        SuccessResponse(res, { access_token, refresh_token });
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};

const updateProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    // Validate input
    if (!id) {
        BadRequestResponse(res, 'User ID is required.');
        return;
    }

    if (!name && !email && !phone) {
        BadRequestResponse(res, 'At least one field (name, email, or phone) is required to update.');
        return;
    }

    try {
        // Check if the user exists
        const existingUser = await UserService.findOne({ id });
        if (!existingUser) {
            BadRequestResponse(res, 'User does not exist.');
            return;
        }

        // Update the user profile
        const updatedUser = await UserService.update(id, {
            ...existingUser,
            ...req.body,
        });

        SuccessResponse(res, omit(updatedUser, ['password']));
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};

const getMe = async (req: Request, res: Response) => {
    const access_token = req.headers.authorization?.split(' ')[1];
    console.log(`🚀 ~ getMe ~ access_token:`, access_token);

    if (!access_token) {
        BadRequestResponse(res, 'Token không hợp lệ.');
        return;
    }

    try {
        const decoded = verify(access_token, AppConfig.TOKEN_KEY) as { id: string };
        const user = await UserService.findOne({ id: Number(decoded.id) });

        if (!user) {
            BadRequestResponse(res, 'Người dùng không tồn tại.');
            return;
        }

        const { id, name, email } = user;
        SuccessResponse(res, omit(user, ['password']));
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};
export const UserController = {
    register,
    login,
    getMe,
    updateProfile,
};
