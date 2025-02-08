import express, { Request, Response, Router } from "express";
import checkSession from "@middlewares/auth.middleware";
import session from "@typesexpress-session";
import { UserRole } from "@entitiesUser";

const router: Router = express.Router();

router.get('/admin', checkSession, async (req: Request, res: Response) => {
  if (req.session && req.session._user ) {
    if(req.session._user.Role == UserRole.Admin){
      res.render('./pages/dashboard', {isLoggedIn: true, user: req.session._user});
    }
    else{
      res.redirect('/');
    }
  } else {
    return res.redirect('/login');
  }
});

export default router;

