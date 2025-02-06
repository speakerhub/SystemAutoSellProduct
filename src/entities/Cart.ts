import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinTable, Collection, JoinColumn } from "typeorm";
import { Product } from "@entitiesProduct";
import {User} from "@entitiesUser";

@Entity({name: "Cart"})
export class Cart {
    @PrimaryGeneratedColumn()
    id?: number

    @OneToOne(() => User, (user) => user.cart) // Một cart thuộc về một user
    user: User;

    @ManyToMany(() => Product, (product) => product.carts) // Quan hệ N-N với Product
    @JoinTable() // Bảng trung gian giữa Cart và Product
    products: Product[];

    @Column({ type: 'float', default: 0 })
    TotalPrice?: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;
}

export default Cart;