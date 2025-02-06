import express, { Express, Request, Response, Router } from "express";
const router: Router = express.Router();
import upload from "@middlewaresmulter.config";
import ProductController from "@controllersproduct.controller";
import CategoryController from "@controllerscategory.controller";
import checkSession from "@middlewares/auth.middleware";

// product routes
router.get('/productServices', checkSession, async (req: Request, res: Response) => {
    return res.render('./pages/productservices');
});

router.get('/productDetail/:id', async (req: Request, res: Response) => {
    await ProductController.getProductDetail(req, res);
});

router.get('/createProduct', checkSession, async (req: Request, res: Response) => {
    return res.render('./pages/createProduct');
});

router.post('/createProduct', upload.single('ImageUrl'), async (req: Request, res: Response) => {
    await ProductController.createProduct(req, res);
});

router.get('/getAllProduct', async (req: Request, res: Response) => {
    await ProductController.getAllProduct(req, res);
});

router.get('/get12Product', async (req: Request, res: Response) => {
    await ProductController.get12Product(req, res);
});

router.get('/getRecentProducts', async (req: Request, res: Response) => {
    await ProductController.getRecentProducts(req, res);
});

router.get('/editProduct/:id', checkSession, async (req: Request, res: Response) => {
    await ProductController.editPage(req, res);
});

router.post('/editProduct/:id', upload.single('ImageUrl'), async (req: Request, res: Response) => {
    await ProductController.Update(req, res);
});

router.delete('/deleteProduct/:id', ProductController.Delete);

export default router;
