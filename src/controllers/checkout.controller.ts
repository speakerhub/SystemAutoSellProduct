import express, { Request, Response } from "express";
import checkoutServices from "@servicescheckout.services";

class checkoutController {

    static async checkout(req: Request, res: Response) {
       await checkoutServices.payment(req, res);
    }
}


export default checkoutController;
