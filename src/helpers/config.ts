import * as dotenv from 'dotenv';
dotenv.config();

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);
const TOKEN_KEY = process.env.TOKEN_KEY;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;

export const AppConfig = {
    SALT_ROUND,
    TOKEN_KEY,
    REFRESH_TOKEN_KEY,
};
