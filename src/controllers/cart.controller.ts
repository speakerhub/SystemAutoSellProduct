import cartservices from "@servicescart.services";
import { Request, Response } from "express";

class Cartcontroller{
    static async addToCart(req: Request, res: Response){
        await cartservices.addToCart(req, res);
    }

    static async addToCartWithCount(req: Request, res: Response){
        await cartservices.addToCartWithCount(req, res);
    }

    static async removeFromCart(req: Request, res: Response){
        await cartservices.removeFromCart(req, res);
    }
}

export default Cartcontroller;