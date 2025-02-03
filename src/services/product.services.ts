import { Request, Response } from "express";
import { AppDataSource } from "@config/data-source";
import { In } from "typeorm";
import "reflect-metadata";
import Product from "@entities/Product";
import Category from "@entitiesCategory";
const productRepository = AppDataSource.getRepository(Product);
const categoryRepository = AppDataSource.getRepository(Category);

class ProductService{
    static async createProduct(req: Request, res: Response){
        try{
            const data = req.body;
            
            const categoryIds = data.category;

            // console.log(categoryIds);
            // console.log(data, req.file?.filename);
            const categories = await categoryRepository.findBy({ id: In(categoryIds) });

            const product = new Product();
            product.ProductName = data.productname;
            product.ProductCount = data.count;
            product.ImageUrl = req.file?.filename;
            product.Weight = data.weight;
            product.Dimensions = data.dimensions;
            product.Description = data.description;
            product.Price = data.price;
            product.Producer = data.producer;
            product.Rating = data.rating;
            product.isActive = true;
            product.categories = categories;

            await productRepository.save(product);
            res.redirect('/productServices');
        }
        catch (error){
            console.log(error);
            res.status(500).json({ message: 'An error occurred while creating product' });
        }
    }

    static async getAllProducts(req: Request, res: Response) {
        try {
            const products = await productRepository.find({
                relations: ['categories']
            });
            // console.log(products);
            
            if (!products.length) {
                return res.status(404).json({ message: 'No products found' });
            }
    
            // console.log('Fetched products:', JSON.stringify(products, null, 2));
            res.status(200).json({ data: products });
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ message: 'Error fetching products', error: error });
        }
    }

    static async editPages(req: Request, res: Response) {
        try {
            const productId = parseInt(req.params.id); 
            // console.log('Product ID:', productId);
            
            if (isNaN(productId)) {
                return res.status(400).json({ message: 'Invalid product ID' });
            }

            const product = await productRepository.findOne({
                where: { id: productId },
                relations: ['categories']
            });

            const categories = await categoryRepository.find();

            // console.log(product);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.render('./pages/editProduct', { product, categories });
        }
        catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ message: 'Error fetching products', error: error });
        }
    }

    static async updateProduct(req: Request, res: Response) {
        try {
            const data = req.body;
            // console.log(data);
            const id = parseInt(req.params.id);
    
            // Tìm sản phẩm theo ID và các danh mục liên quan
            const product = await productRepository.findOne({ 
                where: { id },
                relations: ['categories'] 
            });
    
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            // Cập nhật các thuộc tính của sản phẩm
            product.ProductName = data.productname;
            product.ProductCount = data.count;
            product.ImageUrl = req.file?.filename ? req.file?.filename : product.ImageUrl;  // Giữ nguyên ảnh nếu không có ảnh mới
            product.Weight = data.weight;
            product.Dimensions = data.dimensions;
            product.Description = data.description;
            product.Price = data.price;
            product.Producer = data.producer;
            product.Rating = data.rating;
            product.isActive = true;
    
            // Cập nhật danh mục sản phẩm (nếu có)
            if (Array.isArray(data.category) && data.category.length > 0) {
                const categories = await categoryRepository.findBy({ id: In(data.category) });
                product.categories = categories;
            }
    
            // Lưu sản phẩm đã cập nhật vào cơ sở dữ liệu
            await productRepository.save(product);
    
            // Chuyển hướng đến trang chỉnh sửa sản phẩm
            res.redirect(`/editProduct/${id}`);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'An error occurred while updating product' });
        }
    }    
}

export default ProductService;