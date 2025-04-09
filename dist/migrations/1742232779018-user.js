"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User1742232779018 = void 0;
const bcryptjs_1 = require("bcryptjs");
const Role_1 = require("../entity/Role");
class User1742232779018 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminPassword = yield (0, bcryptjs_1.hash)('admin123', 12);
            yield queryRunner.query(`
            INSERT INTO "user" (name, email, password, role, verified, avatar_url, phone, store_codes, role_codes, created_at, updated_at)
            VALUES 
                ('Admin', 'admin@example.com', '${adminPassword}', '${Role_1.TypeRole.ADMIN}', true, '', '1234567890', '{}', '{}', NOW(), NOW());
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            DELETE FROM "user" WHERE email = 'admin@example.com';
        `);
        });
    }
}
exports.User1742232779018 = User1742232779018;
//# sourceMappingURL=1742232779018-user.js.map