import express, { Request, Response, Router } from "express";
import checkSession from "@middlewares/auth.middleware";
import session from "@typesexpress-session";

const router: Router = express.Router();

router.get('/', checkSession, async (req: Request, res: Response) => {
  res.render('home', { user: req.session._user}); // Lưu trữ đối tượng User trong session
});

export default router;

