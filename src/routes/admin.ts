import express, { Request, Response, Router } from "express";
import checkSession from "@middlewares/auth.middleware";
import session from "@typesexpress-session";
import User, { UserRole } from "@entitiesUser";
import { AppDataSource } from "@configdata-source";
import ReceiptController from "@controllersreceipt.controller";
import UserController from "@controllersuser.controller";

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

router.get('/account/manager', checkSession, async (req: Request, res: Response) => {
  if (req.session && req.session._user ) {
    if(req.session._user.Role == UserRole.Admin){
      res.render('./pages/accountservices', {isLoggedIn: true, user: req.session._user});
    }
    else{
      res.redirect('/');
    }
  } else {
    return res.redirect('/login');
  }
});

router.get('/receipt', checkSession, async (req: Request, res: Response) => {
  if (req.session && req.session._user ) {
    if(req.session._user.Role == UserRole.Admin){
      res.render('./pages/billing', {isLoggedIn: true, user: req.session._user});
    }
    else{
      res.redirect('/');
    }
  } else {
    return res.redirect('/login');
  }
});

router.get('/extendtool', checkSession, async (req: Request, res: Response) => {
  if (req.session && req.session._user ) {
    if(req.session._user.Role == UserRole.Admin){
      res.render('./pages/extendtool', {isLoggedIn: true, user: req.session._user});
    }
    else{
      res.redirect('/');
    }
  } else {
    return res.redirect('/login');
  }
});

router.get('/notification', checkSession, async (req: Request, res: Response) => {
  if (req.session && req.session._user ) {
    if(req.session._user.Role == UserRole.Admin){
      res.render('./pages/notifications', {isLoggedIn: true, user: req.session._user});
    }
    else{
      res.redirect('/');
    }
  } else {
    return res.redirect('/login');
  }
});

router.post('/getAllUser', async (req: Request, res: Response) => {
  try{
    if(!req.session._user){
      res.redirect('/login');
    }

    if(req.session._user?.Role != UserRole.Admin){
      res.status(403).json({message: "you don't have permission to this request."});
    }

    const user = await AppDataSource.getRepository(User).find();

    if(!user){
      res.status(404).json({ message: "can find user" });
    }

    res.status(200).json({ users: user });
  }catch(err){
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.put('/User/update/active', async (req: Request, res: Response) => {
  await UserController.UpdateActive(req, res);
});

router.put('/User/update/role', async (req: Request, res: Response) => {
  await UserController.UpdateRole(req, res);
});

router.post('/BanUser/:id', async (req: Request, res: Response) => { 
  await UserController.BanAccount(req, res);
});

router.post('/UnbanUser/:id', async (req: Request, res: Response) => { 
  await UserController.UnbanAccount(req, res);
});

router.post('/getMoneyToday', async (req: Request, res: Response) => {
  await ReceiptController.getMoneyToday(req, res);
});

router.post('/getMoneyTotal', async (req: Request, res: Response) => {
  await ReceiptController.getMoneyTotal(req, res);
});

router.post('/getAccountToday', async (req: Request, res: Response) => {
  await ReceiptController.getUserToday(req, res);
});

export default router;

