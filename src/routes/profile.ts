import express, { Request, Response, Router } from "express";
import checkSession from "@middlewares/auth.middleware";
import session from "@typesexpress-session";

const router: Router = express.Router();

router.get('/profile', checkSession, async (req: Request, res: Response) => {
  if (req.session && req.session._user) {
    res.render('./loginPages/profile', { isLoggedIn: true, user: req.session._user });
  } else {
    return res.redirect('/login');
  }
});


export default router;

