import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const a = schema.parse({
            params: req.params,
            query: req.query,
            body: req.body,
        });
        next();
    } catch (err: any) {
        next(
            res.status(400).json({
                status: 'fail',
                errors: err.errors,
            })
        );
    }
};
