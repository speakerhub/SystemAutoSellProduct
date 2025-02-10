import express, { Request, Response } from "express";
import { AppDataSource } from "@config/data-source";
import OrderItem from "@entities/OrderItem";
import { json } from "body-parser";
import { checkZaloPayStatus, createZaloPayOrder } from "@configzalopay";
import axios from "axios";
import crypto from 'crypto';
const orderitemRepository = AppDataSource.getRepository(OrderItem);

interface Result {
    return_code: number;
    return_message: string;
}

class checkoutService {
    static async createPayment(req: any, res: Response): Promise<any> {
        try {
            let { products, total, billingInfo } = req.body;
            // console.log(products, total, billingInfo);
            // console.log("Type of Products:", typeof products);
            if (!req.session || !req.session._user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            if (typeof products === 'string') {
                try {
                    products = JSON.parse(products);  // Parse chuỗi thành mảng
                } catch (error) {
                    console.error("Invalid JSON format:", error);
                    return; // Xử lý lỗi nếu JSON không hợp lệ
                }
            }

            // Tạo đơn hàng mới
            const newOrder = new OrderItem();
            newOrder.user = req.session._user;

            // Sửa lỗi: Gán tất cả sản phẩm vào `items` thay vì chỉ lưu sản phẩm cuối cùng
            newOrder.items = products.map(( product: any )=> ({
                productId: product.id,
                name: product.ProductName,
                price: product.Price,
                color: product.Color,
                size: product.Size,
                quantity: product.ProductCount,
            }));

            // Gán địa chỉ giao hàng
            newOrder.shippingAddress = {
                firstName: billingInfo.firstName,
                lastName: billingInfo.lastName,
                phone: billingInfo.phone,
                address1: billingInfo.address1,
                address2: billingInfo.address2 || "",
                ward: billingInfo.ward,
                city: billingInfo.city,
                district: billingInfo.district,
                zip: billingInfo.zip,
            };

            newOrder.totalAmount = total;
            newOrder.status = "Pending";

            // Lưu vào database
            await orderitemRepository.save(newOrder);

            const orderId = `ORDER_${newOrder.id}`;
            console.log(1); 
            const { response, app_trans_id } = await createZaloPayOrder(total, orderId);
            console.log(2, response);
            res.status(200).json({ message:'payment-success', response: response, app_trans_id: app_trans_id  });

        } catch (error) {
            console.error("Error during checkout:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async checkPaymentStatus(req: Request, res: Response) {
        try {
            const { app_trans_id } = req.params;
            const { response } = await checkZaloPayStatus(app_trans_id);
    
            return res.json({ response: response });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    static async paymentCallback(req: Request, res: Response){
        const config = {
            key2: "eG4r0GcoNtRGbO8"
        };
        
        let result: Result = {
            return_code: 0, // Default value for the return code
            return_message: "" // Default value for the return message
        };

        try {
            let dataStr = req.body.data;
            let reqMac = req.body.mac;

            let mac = crypto.createHmac('sha256', config.key2).update(dataStr).digest('hex');
            console.log("mac =", mac);


            if (reqMac !== mac) {
                result.return_code = -1;
                result.return_message = "failed";
            }
            else {
                let dataJson = JSON.parse(dataStr);
                console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

                result.return_code = 1;
                result.return_message = "success";

                await checkoutService.updateOrderStatus(dataJson["app_trans_id"], result.return_message);
            }
            
        } catch (ex) {
            result.return_code = 0; 
            result.return_message = (ex instanceof Error ? ex.message : String(ex)) || "Lỗi không xác định";
        }

        res.json(result);
    }

    static async updateOrderStatus(orderId: number, status: string) {
        try {
            const order = await AppDataSource.getRepository(OrderItem).findOne({
                where: {id: orderId }
            });
            if (order) {
                if(status === "success"){
                    order.status = "Shipped";
                }
            }else{
                throw new Error("Order not found");
            }
            
            await AppDataSource.getRepository(OrderItem).save(order);
    
            console.log(`Order ${orderId} status updated to ${status}`);
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    }
    
}

export default checkoutService;
