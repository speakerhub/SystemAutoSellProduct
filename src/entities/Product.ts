import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Collection } from "typeorm";
import { Category } from '@entitiesCategory';
import {Cart} from '@entitiesCart';
// export enum UserRole {
//     Admin = 'Admin',
//     User = 'User',
// }

// export enum UserGender {
//     Male = 'Male',
//     Female = 'Female',
//     Other = 'Other',
// }

@Entity({name: "Product"})
export class Product {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    ProductName?: string;

    @ManyToMany(() => Category, (category) => category.products)
    categories?: Category[];

    @Column({ default: 0 })
    ProductCount?: number

    @Column({ nullable: true })
    ImageUrl?: string;

    @Column({ type: 'float', nullable: true })
    Weight?: number;

    @Column({ nullable: true })
    Dimensions?: string;

    @Column({ type: 'text', nullable: true })
    Description?: string;

    @Column({ type: 'float', default: 0 })
    Price?: number

    @Column({ type: 'float', default: 0 })
    Discount?: number;

    @Column({ unique: true })
    Producer?: string

    @Column({ type: 'float', default: 0 })
    Rating?: number;
    
    @Column({ default: false })
    isActive?: boolean
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    UpdatedAt?: Date;

    @Column("simple-array", { nullable: true })
    Tags?: string[];

    @Column({ default: "Available" })
    Status?: string;

    @ManyToMany(() => Cart, (carts) => carts.products) // Tạo bảng trung gian tự động
    carts?: Cart[];
}

export default Product;