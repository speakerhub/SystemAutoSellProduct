import express, { Request, Response, Router } from "express";
import checkSession from "@middlewares/auth.middleware";
import session from "@typesexpress-session";

const router: Router = express.Router();

router.get('/carts', async (req: Request, res: Response) => {
  if (req.session && req.session._user) {
    res.render('./shop/cart', {isLoggedIn: true, user: req.session._user}); // Lưu trữ đối tượng User trong session
  } else {
    res.render('./shop/cart', {isLoggedIn: false, user: req.session._user});
  }
});

export default router;

