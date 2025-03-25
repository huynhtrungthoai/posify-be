"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const PaymentMethod_1 = require("./entity/PaymentMethod");
const Product_1 = require("./entity/Product");
const Role_1 = require("./entity/Role");
const Shift_1 = require("./entity/Shift");
const Store_1 = require("./entity/Store");
const TimeKeeping_1 = require("./entity/TimeKeeping");
const WorkingDay_1 = require("./entity/WorkingDay");
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
    entities: [User_1.User, PaymentMethod_1.PaymentMethod, Product_1.Product, Role_1.Role, Shift_1.Shift, Store_1.Store, TimeKeeping_1.TimeKeeping, WorkingDay_1.WorkingDay],
    synchronize: true,
    logging: false,
    // migrationsTableName: 'migration',
    migrationsRun: true,
    // entities: ['src/entities/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    // subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
//# sourceMappingURL=dataSource.js.map