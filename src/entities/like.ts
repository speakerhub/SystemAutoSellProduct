import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Collection } from "typeorm";
import { Product } from "@entitiesProduct";

@Entity({name: "Like"})
export class Like {
    @PrimaryGeneratedColumn()
    id?: number

    @ManyToMany(() => Product, (product) => product.carts)
    @JoinTable() // Tạo bảng trung gian tự động
    products?: Product[];

    @Column({ default: 0 })
    TotalPrice?: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;
}

export default Like;