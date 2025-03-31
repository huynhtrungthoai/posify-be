import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';
import { AppDataSource } from './dataSource';
import router from './routes';
dotenv.config();

const app = express();

app.use(router);
AppDataSource.connect()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on ${process.env.NODE_ENV}  port ${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
