import { Request, Response } from "express";

class ProductController{
    static async createProduct(req: Request, res: Response){
        const data = req.body;
        console.log(data);
    }
}

export default ProductController;