import { Request, Response } from "express";
import ReceiptService from "@servicesreceipt.services";

class ReceiptController {

    // Phương thức tĩnh getOrder
    static async getMoneyToday(req: Request, res: Response): Promise<any> {
        await ReceiptService.getMoneyToday(req, res);  // Gọi service để xử lý
    }

    static async getMoneyTotal(req: Request, res: Response): Promise<any> {
        await ReceiptService.getMoneyTotal(req, res);  // Gọi service để xử lý
    }


    static async getUserToday(req: Request, res: Response): Promise<any> {
        await ReceiptService.getUserToday(req, res);  // Gọi service để xử lý
    }
    
}

export default ReceiptController;

