"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
const appError_1 = require("../helpers/appError");
const requireUser = (_, res, next) => {
    console.log(`🚀 ~ requireUser ~ res:`, res);
    try {
        const user = res.locals.user;
        if (!user) {
            (0, appError_1.ErrorResponse)(res, `Session has expired or user doesnt exist`);
        }
        // next();
    }
    catch (err) {
        (0, appError_1.ErrorResponse)(res, err.message);
    }
};
exports.requireUser = requireUser;
//# sourceMappingURL=requireUser.js.map