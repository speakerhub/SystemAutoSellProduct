import { Request, Response } from "express";
import { AppDataSource } from "@config/data-source";
import { ILike, Like, In } from "typeorm";
import "reflect-metadata";
import Product from "@entities/Product";
import Category from "@entitiesCategory";
const productRepository = AppDataSource.getRepository(Product);
const categoryRepository = AppDataSource.getRepository(Category);


class ProductService{
    static async createProduct(req: Request, res: Response){
        try{
            const data = req.body;
            const categoryIds = data.category ? data.category : [];

            // console.log(categoryIds);
            // console.log(data, req.file?.filename);

            const categories = categoryIds.length > 0 ? await categoryRepository.findBy({ id: In(categoryIds) }) : [];
            

            const product = new Product();
            product.ProductName = data.productname;
            product.ProductCount = data.count;
            product.ImageUrl = req.file?.filename;
            product.Weight = data.weight;
            product.Dimensions = data.dimensions;
            product.Description = data.description;
            product.Size = Array.isArray(data.size) ? data.size : data.size.split(",");
            product.Color = Array.isArray(data.color) ? data.color : data.color.split(",");
            product.Discount = parseFloat(data.discount) || 0;
            product.Tags = Array.isArray(data.tags) ? data.tags : data.tags.split(",");
            product.Price = parseFloat(data.price) || 0; 
            product.Producer = data.producer;
            product.Rating = 0;
            product.isActive = true;
            product.categories = categories;

            await productRepository.save(product);
            res.redirect('/createProduct');
        }
        catch (error){
            console.log(error);
            res.status(500).json({ message: 'An error occurred while creating product' });
        }
    }

    static async Comment(req: Request, res: Response){
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'An error occurred while commenting' });
        }
    }

    static async search(req: Request, res: Response): Promise<any>{
        try{
            const keywords = req.params.keywords;
            // console.log(keywords);
            const products = await productRepository.find({
                where: [
                    { ProductName: Like(`%${keywords}%`) },
                    { Description: Like(`%${keywords}%`) }
                ],
            });

            if (products.length > 0) {
                return res.status(200).json({ products });
            } else {
                return res.status(404).json({ message: 'No products found' });
            }
        } catch(error){
            console.log(error);
            res.status(500).json({ message: 'An error occurred while searching' });
        }
    }

    static async getAllProducts(req: Request, res: Response) {
        try {
            const products = await productRepository.find({
                relations: ['categories'],
            });
            // console.log(products);
            
            if (!products.length) {
                return res.status(404).json({ message: 'No products found' });
            }

            // res.cookie('name', 'john Joe', {maxAge: 900000})
    
            // console.log('Fetched products:', JSON.stringify(products, null, 2));
            res.status(200).json({ data: products });
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ message: 'Error fetching products', error: error });
        }
    }
    static async get12Products(req: Request, res: Response) {
        try {
            const products = await productRepository.find({
                relations: ['categories'],
                take: 12,
            });
            // console.log(products);
            
            if (!products.length) {
                return res.status(404).json({ message: 'No products found' });
            }

            // res.cookie('name', 'john Joe', {maxAge: 900000})
    
            // console.log('Fetched products:', JSON.stringify(products, null, 2));
            res.status(200).json({ data: products });
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ message: 'Error fetching products', error: error });
        }
    }

    static async getProductbyprice(req: Request, res: Response) {
        try{
            const {price} = req.body;
            // console.log(price);

            const product = await productRepository.find({
                where: { Price: price },
                relations: ['categories']
            });

            if (!product) {
                return res.status(404).json({ message: 'No products found', data: null });
            }

            res.status(200).json({ data: product});
        } catch (error){
            console.log(error);
            res.status(500).json({ message: 'An error occurred while fetching products by price' });
        }
    }

    static async getProductbyColor(req: Request, res: Response) {
        try {
            const { colors }: { colors: string[] } = req.body;
        
            const whereConditions = colors.map(color => ({
                Color: ILike(`%${color}%`)  // Tìm sản phẩm có chứa bất kỳ màu nào trong danh sách
            }));

            const products = await productRepository.find({
                where: whereConditions,
                relations: ['categories']
            });

            res.json({ data: products });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'An error occurred while fetching products by color' });
        }
    }

    static async getRandom4Products(req: Request, res: Response): Promise<any> {
        try {
            const products = await productRepository.createQueryBuilder("product")
                .leftJoinAndSelect("product.categories", "category")
                .orderBy("RAND()") // Lấy ngẫu nhiên
                .take(4)
                .getMany();
    
            res.status(200).json({products: products}); // Trả về danh sách sản phẩm
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ message: "Error fetching products", error: error });
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
            res.render('./pages/admin/editProduct', { product, categories });
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
            if(data.isActive === "true") {
                // console.log(data.isActive);
            }
            else{
                // console.log(false);
            }
            
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
            product.isActive = data.isActive === "true" ? true: product.isActive = false;
            product.Tags = Array.isArray(data.tags) ? data.tags : data.tags.split(",");
            product.Discount = parseFloat(data.discount) || 0;
            product.Color = Array.isArray(data.color) ? data.color : data.color.split(",");
            product.Size = Array.isArray(data.size) ? data.size : data.size.split(",");
            product.Status = data.status;
            // Cập nhật danh mục sản phẩm (nếu có)
            if (Array.isArray(data.category) && data.category.length > 0) {
                const categories = await categoryRepository.findBy({ id: In(data.category) });
                product.categories = categories;
            }
            else{
                product.categories = [];
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

    static async deleteProduct(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            // console.log(id);

            const product = await productRepository.findOne({  where: { id: id }});
            
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            await productRepository.softDelete(id);
            res.status(200).json({ message: 'Product deleted'});


        } catch(error){
            console.log(error);
            res.status(500).json({ message: 'An error occurred while deleting product' });
        }
    }

    static async getRecentProducts(req: Request, res: Response) {
        try {
            const recentProducts = await productRepository.find({
                order: { createdAt: "DESC" }, // Sắp xếp theo ngày tạo giảm dần
                take: 8, // Giới hạn lấy 8 sản phẩm
            });

            res.json({ success: true, data: recentProducts });
        } catch(error){
            console.log(error);
            res.status(500).json({ message: 'An error occurred while getting recent products' });
        }
    }

    static async getProductDetail(req: Request, res: Response): Promise<any> {
        try {
            const productId = parseInt(req.params.id);
            // console.log(productId);

            const productDetail = await productRepository.findOne({
                where: { id: productId },
                relations: ['categories'],
            })

            if (!productDetail) {
                return res.status(404).json({ message: 'Product not found' });
            }
            if (req.session && req.session._user) {
                res.cookie('userid', req.session._user?.id, {httpOnly: false});
                res.render("./shop/productDetail", { isLoggedIn: true, user: req.session._user, productDetail: productDetail });
            } else {
                res.render('./shop/productDetail', {isLoggedIn: false, user: null,  productDetail: productDetail }); // Lưu trữ đối tượng User trong session
            }

        } catch (err) {
            console.error("Error fetching product detail:", err);
            res.status(500).json({ message: 'Error fetching product detail', error: err });
        }
    }
}

export default ProductService;