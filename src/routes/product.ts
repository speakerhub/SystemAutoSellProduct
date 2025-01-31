import express, { Express, Request, Response, Router } from "express";
const router: Router = express.Router();

import ProductController from "@controllersproduct.controller";

router.get('/productServices', (req: Request, res: Response) => {
    res.render('./pages/productservices');
});

router.post('/createProduct', async (req: Request, res: Response) => {
    ProductController.createProduct(req, res);
});


export default router;
