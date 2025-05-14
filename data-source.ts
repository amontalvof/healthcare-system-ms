import 'reflect-metadata';
import * as path from 'path';
import { config as loadEnv } from 'dotenv';
import { DataSource } from 'typeorm';

loadEnv({ path: path.resolve(__dirname, '.env') });

const entitiesGlob = path.join(
    __dirname,
    'libs/common-utils/src/db/postgres/schemas/*{.ts,.js}', // ← adjust this path
);

console.log(
    process.env.SYNC_POSTGRES_HOST,
    process.env.POSTGRES_PORT,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    process.env.POSTGRES_DB,
);

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.SYNC_POSTGRES_HOST ?? 'localhost',
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    username: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'password',
    database: process.env.POSTGRES_DB ?? 'myDB',
    entities: [entitiesGlob],
    synchronize: true,
    logging: true,
});
