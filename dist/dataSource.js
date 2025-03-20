"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    // url: 'postgres://default:R3mLQfI2FVwl@ep-tiny-water-a1dq6tvz.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require',
    // ======
    host: 'localhost',
    port: 5432,
    username: 'thoaihuynh',
    password: '123456',
    database: 'posify-db',
    // =======
    entities: [User_1.User],
    synchronize: true,
    logging: false,
    // migrationsTableName: 'migration',
    // entities: ['src/entities/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    // subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
//# sourceMappingURL=dataSource.js.map