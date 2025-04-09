"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = ErrorResponse;
exports.SuccessResponse = SuccessResponse;
exports.BadRequestResponse = BadRequestResponse;
exports.UnauthorizedResponse = UnauthorizedResponse;
exports.ForbiddenResponse = ForbiddenResponse;
exports.NotFoundResponse = NotFoundResponse;
exports.NotAllowedResponse = NotAllowedResponse;
class AppError extends Error {
    constructor(statusCode = 500, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
function ErrorResponse(res, message = undefined, status = 500) {
    let data = {
        error: { message: message || 'Internal Server Error' },
    };
    return res.status(status).send(data);
}
function SuccessResponse(res, data, status = 200) {
    return res.status(status).send(data);
}
function BadRequestResponse(res, message = undefined) {
    let data = {
        error: { message: message || 'Bad Request' },
    };
    return res.status(400).send(data);
}
function UnauthorizedResponse(res, message = undefined) {
    let data = {
        error: { message: message || 'Unauthorized' },
    };
    return res.status(401).send(data);
}
function ForbiddenResponse(res, message = undefined) {
    let data = {
        error: { message: message || 'Forbidden' },
    };
    return res.status(403).send(data);
}
function NotFoundResponse(res, message = undefined) {
    let data = {
        error: { message: message || 'Not Found' },
    };
    return res.status(404).send(data);
}
function NotAllowedResponse(res, message = undefined) {
    let data = {
        error: { message: message || 'Method Not Allowed' },
    };
    return res.status(405).send(data);
}
//# sourceMappingURL=appError.js.map