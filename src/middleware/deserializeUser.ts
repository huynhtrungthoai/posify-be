import { NextFunction, Request, Response } from 'express';
import AppError, { ErrorResponse, UnauthorizedResponse } from '../helpers/appError';
import { verifyJwt } from '../helpers/jwt';
import redisClient from '../helpers/connectRedis';
import { findUser, findUserById } from '../services/userService';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
dotenv.config();

const TOKEN_KEY = process.env.TOKEN_KEY;
export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader?.startsWith('Bearer') ? authHeader.split(' ')[1] : req.cookies?.access_token;

        if (!accessToken) {
            UnauthorizedResponse(res, 'You are not logged in');
        }

        const decoded = jwt.verify(accessToken, TOKEN_KEY) as { id: string };
        const user = await findUser({ id: Number(decoded?.id) });

        if (!user || !decoded) {
            UnauthorizedResponse(res, 'Invalid token or session has expired');
        }

        // Add user to res.locals
        res.locals.user = user;

        next();
    } catch (err: any) {
        ErrorResponse(res, err.message);
    }
};
