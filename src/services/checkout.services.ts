import express, { Request, Response } from "express";
import { AppDataSource } from "@config/data-source";
import OrderItem from "@entities/OrderItem";
import { json } from "body-parser";
const orderitemRepository = AppDataSource.getRepository(OrderItem);

class checkoutService {
    static async payment(req: any, res: Response): Promise<any> {
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

            // console.log("Order saved:", newOrder); 
            return res.status(201).json({ message: "Order placed successfully", order: newOrder });

        } catch (error) {
            console.error("Error during checkout:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default checkoutService;
