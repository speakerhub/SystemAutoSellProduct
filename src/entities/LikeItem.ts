import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn } from "typeorm";
import { User } from "./User";  // Import User nếu có
import Product from "@entitiesProduct";
import Like from "@entitieslike";

@Entity({ name: "LikeItem" })
export class LikeItem {
    @PrimaryGeneratedColumn()
        id?: number;
    
        @ManyToOne(() => Like, (like) => like.likeItems) // Mối quan hệ N-1 với Cart
        like?: Like;
    
        @ManyToOne(() => Product, (product) => product.LikeItems) // Mối quan hệ N-1 với Product
        product?: Product;
    
        @Column({ type: 'int', default: 1 }) // Số lượng sản phẩm
        quantity?: number;
    
        @Column({ type: 'float', default: 0 }) // Giá của sản phẩm tại thời điểm thêm vào giỏ hàng (nếu cần)
        price?: number;
}

export default LikeItem;
