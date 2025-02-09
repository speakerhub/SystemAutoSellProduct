import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { User } from "@entitiesUser";
import { Product } from "@entitiesProduct";

@Entity({ name: "Comment" })
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text", nullable: true })
    comment?: string;

    @Column({ type: "float", default: 0 })
    rating!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;

    // Một User có thể đánh giá nhiều sản phẩm
    @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
    user!: User;

    // Một sản phẩm có thể có nhiều đánh giá
    @ManyToOne(() => Product, (product) => product.comments, { onDelete: "CASCADE" })
    product!: Product;

}

export default Comment;
