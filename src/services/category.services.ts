import { Request, Response } from "express";
import { AppDataSource } from "@config/data-source";
import Category from "@entities/Category";
import "reflect-metadata";
const categoryRepository = AppDataSource.getRepository(Category);

class CategoryService{
    static async createCategory(req: Request, res: Response){
        try{
            const data = req.body;
            // console.log(data);
            const category = new Category();
            category.CategoryName = data.categoryname;
            
            await categoryRepository.save(category);
            res.redirect('/productServices');
        }
        catch (error){
            console.log(error);
            res.status(500).json({ message: 'An error occurred while creating product' });
        }
    }

    static async getAllCategory(req: Request, res: Response) {
        try {
            const categories = await categoryRepository.find();
            
            if (!categories.length) {
                return res.status(404).json({ message: 'No products found' });
            }
    
            // console.log('Fetched products:', JSON.stringify(products, null, 2));
            res.status(200).json({ data: categories });
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ message: 'Error fetching products', error: error });
        }
    }

    static async editPages(req: Request, res: Response) {
        try {
            const categoryId = parseInt(req.params.id); 
            // console.log('Product ID:', productId);
            
            if (isNaN(categoryId)) {
                return res.status(400).json({ message: 'Invalid product ID' });
            }

            const category = await categoryRepository.findOneBy({ id: categoryId });
            // console.log(category);

            if (!category) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.render('./pages/editCategory', { category });
        }
        catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ message: 'Error fetching products', error: error });
        }
    }
}

export default CategoryService;