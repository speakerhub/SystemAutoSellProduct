import express, { Request, Response, Router } from "express";
import checkSession from "@middlewares/auth.middleware";
import session from "@typesexpress-session";

const router: Router = express.Router();

router.get('/profile', checkSession, async (req: Request, res: Response) => {
  res.render('./loginPages/profile', { user: req.session._user}); // Lưu trữ đối tượng User trong session
});

export default router;

