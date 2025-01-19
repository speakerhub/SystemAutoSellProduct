import express, { Request, Response, Router } from "express";
import LoginController from "@controllers/login.controller";

const router: Router = express.Router();

router.get('/login', async (req: Request, res: Response) => {
  LoginController.getLoginPage(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
  LoginController.login(req, res);
});


export default router;

