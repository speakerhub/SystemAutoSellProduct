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
import { Comment } from '@entities/Comment';
import { OrderItem } from "@entitiesOrderItem";
import { CartItem } from "@entitiesCartItem";
import { PaymentAccount } from "@entitiespaymentaccount";
import { Message } from "@entities/Message";

export const AppDataSource = new DataSource({
    type: process.env.MYSQL_TYPE as "mysql",
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_NAME,
    synchronize: false,
    logging: false,
    entities: [User,Product,Category,Cart,Like,Comment,OrderItem,CartItem,PaymentAccount,Message],
    subscribers: [],
    migrations: ["src/migrations/*.ts"],
})