import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Collection, OneToOne, OneToMany } from "typeorm";
import { Product } from "@entitiesProduct";
import User from "@entitiesUser";
import LikeItem from "@entitiesLikeItem";

@Entity({name: "Like"})
export class Like {
    @PrimaryGeneratedColumn()
    id?: number;

    @OneToOne(() => User, (user) => user.like) // Một giỏ hàng thuộc về một người dùng
    user: User;

    @OneToMany(() => LikeItem, (likeItem) => likeItem.like) // Một giỏ hàng có nhiều CartItem
    likeItems: LikeItem[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;
}

export default Like;