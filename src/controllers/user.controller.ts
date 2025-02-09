import UserService from "@services/user.services";
import { Request, Response } from "express";

class UserController{
    static async UpdateActive(req: Request, res: Response): Promise<any> {
        await UserService.UpdateActive(req, res);  // Gọi service để xử lý
    }

    static async UpdateRole(req: Request, res: Response): Promise<any> {
        await UserService.UpdateRole(req, res);  // Gọi service để xử lý
    }

    static async BanAccount(req: Request, res: Response): Promise<any> {
        await UserService.BanAccount(req, res);  // Gọi service để xử lý
    }

    static async UnbanAccount(req: Request, res: Response): Promise<any> {
        await UserService.UnbanAccount(req, res);  // Gọi service để xử lý
    }
}

export default UserController;