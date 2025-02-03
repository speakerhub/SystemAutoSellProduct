import { Request, Response } from "express";
import ProductService from "@servicesproduct.services";

class ProductController{
    static async createProduct(req: Request, res: Response){
        ProductService.createProduct(req, res);
    }

    static async getAllProduct(req: Request, res: Response){
        ProductService.getAllProducts(req, res);
    }

    static async editPage(req: Request, res: Response){
        ProductService.editPages(req, res);
    }

    static async Update(req: Request, res: Response){
        ProductService.updateProduct(req, res);
    }
}

export default ProductController;