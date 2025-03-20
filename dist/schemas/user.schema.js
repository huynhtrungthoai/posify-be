"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailSchema = exports.loginUserSchema = exports.createUserSchema = void 0;
// import { RoleEnumType } from '../entity/User';
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        })
            .min(6, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        // passwordConfirm: string({
        //     required_error: 'Please confirm your password',
        // }),
        // role: z.optional(z.nativeEnum(RoleEnumType)),
    }),
    // .refine((data) => data.password === data.passwordConfirm, {
    //     path: ['passwordConfirm'],
    //     message: 'Passwords do not match',
    // }),
});
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(6, 'Invalid email or password'),
    }),
});
exports.verifyEmailSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        verificationCode: (0, zod_1.string)(),
    }),
});
//# sourceMappingURL=user.schema.js.map