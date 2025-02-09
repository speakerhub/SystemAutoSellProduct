import express, { Request, Response, Router } from "express";
import checkSession from "@middlewares/auth.middleware";
import session from "@typesexpress-session";
import axios from "axios";
import OrderService from "@servicesorder.services";
import upload from "@middlewaresmulter.config";
import { AppDataSource } from "@configdata-source";
import User from "@entitiesUser";
import bcrypt from 'bcrypt';

const router: Router = express.Router();

router.get('/profile', checkSession, async (req: Request, res: Response) => {
  if (req.session && req.session._user) {
    const location = await OrderService.getLocationName(
      req.session._user?.ward || '',
      req.session._user?.district || '',
      req.session._user?.province || ''
    )
    // console.log(location);
    
    res.render('./loginPages/profile', { isLoggedIn: true, user: req.session._user, location: location});
  } else {
    return res.redirect('/login');
  }
});


router.post('/change/avatar', upload.single('ImageUrl'), async (req: Request, res: Response) => {
  try{
    if(req.file){
      
      if(!req.session._user){
        res.redirect('/login');
      }

      const user = await AppDataSource.getRepository(User).findOne({ 
        where: {id: req.session._user?.id },
      });
      if(!user){
        res.json({message: 'not found user'});
      }

      if (user) {
        if (req.file) {
          user.ImageUrl = req.file?.filename; // Lấy filename từ file đầu tiên
        }

        await AppDataSource.getRepository(User).save(user);

        req.session._user = user;
        req.session.save();
      }
    
      res.redirect('/profile');
    }
    else{
      res.redirect('/profile');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'An error occurred while updating avatar' });
  }
})

router.post('/change/user', async (req: Request, res: Response) => {
  try{
      const { username, email, password } = req.body;
      if(!req.session._user){
        res.redirect('/login');
      }

      const user = await AppDataSource.getRepository(User).findOne({ 
        where: {id: req.session._user?.id },
      }); 

      if(!user){
        res.json({message: 'not found user'});
      }

      if (user) {
        if(username){
          user.firstName = username;
        }
        if(email){
          user.email = email;
        }
        if(password){
          const saltRounds: number = 10;
          const hashedPassword: string = await bcrypt.hash(password, saltRounds);
          user.password = hashedPassword;
        }

        await AppDataSource.getRepository(User).save(user);

        req.session._user = user;
        req.session.save();
      }
    
      res.redirect('/profile');
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'An error occurred while updating avatar' });
  }
});


export default router;

