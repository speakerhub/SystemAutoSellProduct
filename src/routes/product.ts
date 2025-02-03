import express, { Express, Request, Response, Router } from "express";
const router: Router = express.Router();
import upload from "@middlewaresmulter.config";
import ProductController from "@controllersproduct.controller";
import CategoryController from "@controllerscategory.controller";

// product routes
router.get('/productServices', (req: Request, res: Response) => {
    res.render('./pages/productservices');
});

router.post('/createProduct', upload.single('ImageUrl'), async (req: Request, res: Response) => {
    ProductController.createProduct(req, res);
});

router.get('/getAllProduct', async (req: Request, res: Response) => {
    ProductController.getAllProduct(req, res);
});

router.get('/editProduct/:id', async (req: Request, res: Response) => {
    ProductController.editPage(req, res);
});

router.post('/editProduct/:id', upload.single('ImageUrl'),async (req: Request, res: Response) => {
    ProductController.Update(req, res);
});

// category routes 
router.post('/createCategory', async (req: Request, res: Response) => {
    CategoryController.createCategory(req, res);
});

router.get('/getAllCategory', async (req: Request, res: Response) => {
    CategoryController.getAllCategory(req, res);
});

router.get('/editCategory/:id', async (req: Request, res: Response) => {
    CategoryController.editPage(req, res);
});


export default router;
