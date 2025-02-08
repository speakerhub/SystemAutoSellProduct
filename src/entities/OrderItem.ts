import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn } from "typeorm";
import { User } from "./User";  // Import User nếu có

@Entity({ name: "OrderItem" })
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.orderitem)  // Định nghĩa quan hệ với User
    user!: User;

    @Column("json")
    items!: {
        productId: string;  // Vì MySQL không hỗ trợ ObjectId, dùng string
        name: string;
        price: number;
        quantity: number;
    }[];

    @Column({ type: "decimal", precision: 10, scale: 2 })
    totalAmount!: number;

    @Column("json")
    shippingAddress!: {
        firstName: string;
        lastName: string;
        phone: string;
        address1: string;
        address2?: string;
        ward: string;
        city: string;
        district: string;
        zip: string;
    };

    @Column({
        type: "enum",
        enum: ["Pending", "Paid", "Shipped", "Completed"],
        default: "Pending",
    })
    status!: "Pending" | "Paid" | "Shipped" | "Completed";

    @CreateDateColumn()
    createdAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;
}

export default OrderItem;
