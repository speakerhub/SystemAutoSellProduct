import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata"

// entities
import { User } from '@entities/User';
import { Product } from '@entitiesProduct';
import { Category } from '@entities/Category';
import { Cart } from '@entities/Cart';
import { Like } from '@entities/like';


export const AppDataSource = new DataSource({
    type: process.env.MYSQL_TYPE as "mysql",
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_NAME,
    synchronize: false,
    logging: false,
    entities: [User,Product,Category,Cart,Like],
    subscribers: [],
    migrations: [],
})