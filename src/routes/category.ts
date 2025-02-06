import express, { Express, Request, Response, Router } from "express";
const router: Router = express.Router();
import upload from "@middlewaresmulter.config";
import ProductController from "@controllersproduct.controller";
import CategoryController from "@controllerscategory.controller";
import checkSession from "@middlewares/auth.middleware";


// category routes 
router.get('/categoryServices', checkSession, async (req: Request, res: Response) => {
    return res.render('./pages/categoryservices');
});

router.get('/createCategory', async (req: Request, res: Response) => {
    return res.render('./pages/createCategory');
});

router.post('/createCategory', upload.single('ImageUrl'), async (req: Request, res: Response) => {
    await CategoryController.createCategory(req, res);
});

router.get('/getAllCategory', async (req: Request, res: Response) => {
    await CategoryController.getAllCategory(req, res);
});

router.get('/get12Category', async (req: Request, res: Response) => {
    await CategoryController.get12Category(req, res);
});

router.get('/editCategory/:id', checkSession, async (req: Request, res: Response) => {
    await CategoryController.editPage(req, res);
});

router.post('/editCategory/:id', upload.single('ImageUrl'), async (req: Request, res: Response) => {
    await CategoryController.Update(req, res);
});

router.delete('/deleteCategory/:id', CategoryController.Delete);

export default router;
