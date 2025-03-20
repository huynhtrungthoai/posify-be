import { NextFunction, Request, Response } from 'express';
import AppError, { ErrorResponse } from '../helpers/appError';

export const requireUser = (_: Request, res: Response, next: NextFunction) => {
    console.log(`🚀 ~ requireUser ~ res:`, res);
    try {
        const user = res.locals.user;

        if (!user) {
            ErrorResponse(res, `Session has expired or user doesnt exist`);
        }

        // next();
    } catch (err: any) {
        ErrorResponse(res, err.message);
    }
};
