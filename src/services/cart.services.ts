import checkSession from "@middlewares/auth.middleware";
import session from "@typesexpress-session";
import Product from "@entities/Product";
import Category from "@entitiesCategory";
import { AppDataSource } from "@configdata-source";
const productRepository = AppDataSource.getRepository(Product);
const categoryRepository = AppDataSource.getRepository(Category);
import { Request, Response } from "express";

class cartservices{
    static async addToCart(req: Request, res: Response){
        try{
            const id = parseInt(req.params.id);
        
            const product = await productRepository.findOne({
                where: { id: id },
                relations: ['categories']
            });
        
            if(!product){
                res.status(404).json({ success: false, message: 'Product not found' });
            }

            if (!req.session.cart) {
                req.session.cart = [];
            }

            req.session.cart.push(product); 

            res.redirect('/');

        } catch (error){
            console.error('Error adding product to cart:', error);
            res.status(500).json({ success: false, message: error });
        }
    }

    static async addToCartWithCount(req: Request, res: Response): Promise<void> {
        try {
            const productId = parseInt(req.params.id);
            const count = parseInt(req.params.count);
        }
        catch(e){
            console.error('Invalid product or count:', e);
            res.status(400).json({ success: false, message: 'Invalid product or count' });
        }
    }

    static async removeFromCart(req: Request, res: Response){
        try{
            const productIdincart = parseInt(req.params.productId);
            // console.log(productIdincart);

            if (req.session.cart) {
                const index = req.session.cart.findIndex(item => item.id == productIdincart);
                if (index !== -1) {
                    req.session.cart.splice(index, 1);  // Remove the product from the cart array
                    res.json({ success: true, message: 'Item removed from cart' });
                } else {
                    res.json({ success: false, message: 'Item not found' });
                }
            }
            else{
                res.json({ success: false, message: 'Cart not found in session' });
            }
        } catch(error){
            console.error('Error removing product from cart:', error);
            res.status(500).json({ success: false, message: error });
        }
    }
}

export default cartservices;