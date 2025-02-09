import { AppDataSource } from "@configdata-source";
import Cart from "@entitiesCart";
import OrderItem from "@entitiesOrderItem";
import User, { UserRole } from "@entitiesUser";
import { Request, Response } from "express";


class ReceiptService{ 

    static async getMoneyToday(req: Request, res: Response): Promise<any>{
        try {
            // Lấy thời gian bắt đầu và kết thúc ngày hiện tại
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            // Truy vấn tổng tiền hôm nay
            const totalMoneyToday = await AppDataSource.getRepository(OrderItem)
                .createQueryBuilder("orderItem") // Sử dụng alias đúng với entity
                .select("SUM(orderItem.totalAmount)", "total")
                .where("orderItem.createdAt BETWEEN :start AND :end", { start: startOfDay, end: endOfDay })
                .getRawOne();

            res.status(200).json({ totalMoneyToday: totalMoneyToday?.total || 0 });

        } catch (e) {
            console.error("Error fetching order:", e);
            res.status(500).json({ message: "Error fetching order", error: e });
        }
    }

    static async getMoneyTotal(req: Request, res: Response): Promise<any>{
        try {

            // Truy vấn tổng tiền hôm nay
            const totalMoney = await AppDataSource.getRepository(OrderItem)
                .createQueryBuilder("orderItem") // Sử dụng alias đúng với entity
                .select("SUM(orderItem.totalAmount)", "total")
                .getRawOne();

            res.status(200).json({ totalMoney: totalMoney?.total || 0 });

        } catch (e) {
            console.error("Error fetching order:", e);
            res.status(500).json({ message: "Error fetching order", error: e });
        }
    }

    static async getUserToday(req: Request, res: Response): Promise<any>{
        try {

            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            // Truy vấn tổng tiền hôm nay
            const UserToday = await AppDataSource.getRepository(User)
                .createQueryBuilder("User") // Sử dụng alias đúng với entity
                .select("COUNT(User.id)", "totalUser")
                .where("User.createdAt BETWEEN :start AND :end", { start: startOfDay, end: endOfDay })
                .getRawOne();

            res.status(200).json({ UserToday: UserToday?.totalUser || 0 });

        } catch (e) {
            console.error("Error fetching order:", e);
            res.status(500).json({ message: "Error fetching order", error: e });
        }
    }
}

export default ReceiptService;