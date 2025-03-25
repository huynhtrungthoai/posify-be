import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { PaymentMethod } from './entity/PaymentMethod';
import { Product } from './entity/Product';
import { Role } from './entity/Role';
import { Shift } from './entity/Shift';
import { Store } from './entity/Store';
import { TimeKeeping } from './entity/TimeKeeping';
import { WorkingDay } from './entity/WorkingDay';

export const AppDataSource = new DataSource({
    type: 'postgres',

    // url: 'postgres://default:R3mLQfI2FVwl@ep-tiny-water-a1dq6tvz.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require',
    // ======
    host: 'localhost',
    port: 5432,
    username: 'thoaihuynh',
    password: '123456',
    database: 'posify-db',
    // =======
    entities: [User, PaymentMethod, Product, Role, Shift, Store, TimeKeeping, WorkingDay],
    synchronize: true,
    logging: false,
    // migrationsTableName: 'migration',
    // migrationsRun: true,
    // entities: ['src/entities/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    // subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
