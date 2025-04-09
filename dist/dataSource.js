"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    // url: 'postgres://default:R3mLQfI2FVwl@ep-tiny-water-a1dq6tvz.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require',
    // ======
    host: 'localhost',
    port: 5432,
    username: 'thoaihuynh',
    password: '123456',
    database: 'posify-db',
    synchronize: true,
    logging: false,
    // =======
    entities: ['./src/entity/*{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
    // subscribers: ['src/subscribers/**/*{.ts,.js}'],
    // entities: [User, Store],
    // =========
    // ========== drop db
    // dropSchema: true,
    migrationsRun: true,
    // ===========
});
//# sourceMappingURL=dataSource.js.map