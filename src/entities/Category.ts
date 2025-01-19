import { Entity, PrimaryGeneratedColumn,  Column, ManyToMany, JoinTable, Collection } from "typeorm";
import { Product } from "@entitiesProduct";

@Entity({name: "Category"})
export class Category {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ unique: true })
    CategoryName?: string;

    @ManyToMany(() => Product, (product) => product.categories)
    @JoinTable() // Tự động tạo bảng trung gian
    products?: Product[];
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;
}

export default Category;