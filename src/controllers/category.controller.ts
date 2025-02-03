import { Request, Response } from "express";
import categoryService from "@services/category.services";

class CategoryController{
    static async createCategory(req: Request, res: Response){
        categoryService.createCategory(req, res);
    }

    static async getAllCategory(req: Request, res: Response){
        categoryService.getAllCategory(req, res);
    }

    static async editPage(req: Request, res: Response){
        categoryService.editPages(req, res);
    }
}

export default CategoryController;