import { Response } from 'express';

export default class AppError extends Error {
    status: string;
    isOperational: boolean;
    constructor(public statusCode: number = 500, public message: string) {
        super(message);
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export function ErrorResponse(res: Response, message: string | undefined = undefined, status: number = 500) {
    let data = {
        error: { message: message || 'Internal Server Error' },
    };
    return res.status(status).send(data);
}

export function SuccessResponse(res: Response, data: any, status: number = 200) {
    return res.status(status).send(data);
}

export function BadRequestResponse(res: Response, message: string | undefined = undefined) {
    let data = {
        error: { message: message || 'Bad Request' },
    };
    return res.status(400).send(data);
}

export function UnauthorizedResponse(res: Response, message: string | undefined = undefined) {
    let data = {
        error: { message: message || 'Unauthorized' },
    };
    return res.status(401).send(data);
}

export function ForbiddenResponse(res: Response, message: string | undefined = undefined) {
    let data = {
        error: { message: message || 'Forbidden' },
    };
    return res.status(403).send(data);
}

export function NotFoundResponse(res: Response, message: string | undefined = undefined) {
    let data = {
        error: { message: message || 'Not Found' },
    };
    return res.status(404).send(data);
}

export function NotAllowedResponse(res: Response, message: string | undefined = undefined) {
    let data = {
        error: { message: message || 'Method Not Allowed' },
    };
    return res.status(405).send(data);
}
