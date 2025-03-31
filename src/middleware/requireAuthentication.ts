import { NextFunction, Request, Response } from 'express';
import AppError, { ErrorResponse, UnauthorizedResponse } from '../helpers/appError';
import { verifyJwt } from '../helpers/jwt';
import redisClient from '../helpers/connectRedis';
import { findUser, findUserById } from '../services/userService';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
dotenv.config();

const TOKEN_KEY = process.env.TOKEN_KEY;
export const requireAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader?.startsWith('Bearer') ? authHeader.split(' ')[1] : req.cookies?.access_token;

        if (!accessToken) {
            UnauthorizedResponse(res, 'You are not logged in');
            return;
        }

        let decoded;
        try {
            decoded = jwt.verify(accessToken, TOKEN_KEY) as { id: string };
        } catch (err) {
            if (err.name === 'JsonWebTokenError') {
                UnauthorizedResponse(res, 'Invalid token');
            } else if (err.name === 'TokenExpiredError') {
                UnauthorizedResponse(res, 'Token has expired');
            } else {
                ErrorResponse(res, 'Failed to authenticate token');
            }
            return;
        }

        const user = await findUser({ id: Number(decoded?.id) });

        if (!user) {
            UnauthorizedResponse(res, 'User not found or session has expired');
            return;
        }

        // Add user to res.locals
        res.locals.user = user;

        next();
    } catch (err: any) {
        console.error('Error in deserializeUser:', err);
        ErrorResponse(res, 'An unexpected error occurred');
        return;
    }
};
