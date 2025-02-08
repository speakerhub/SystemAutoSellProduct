import express, { Request, Response, Router } from "express";
import checkSession from "@middlewares/auth.middleware";
import session from "@typesexpress-session";
import checkoutController from "@controllerscheckout.controller";
import OrderItem from "@entitiesOrderItem";
import { AppDataSource } from "@configdata-source";

const orderRepository = AppDataSource.getRepository(OrderItem);
const router: Router = express.Router();

router.get('/checkout', async (req: Request, res: Response) => {
  try{ 
    if (req.session && req.session._user) {
      res.render('./shop/checkout', {isLoggedIn: true, user: req.session._user}); // Lưu trữ đối tượng User trong session
    } else {
      res.render('./shop/checkout', {isLoggedIn: false, user: null});
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  
});

router.get('/order', checkSession, async (req: Request, res: Response) => {
  try{
    const order = await orderRepository.find({
      where: {
        user: req.session._user,
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['user'],
    })

    if (!order) {
      res.render('./loginPages/order', {isLoggedIn: true, user: req.session._user, order: null });
    }

    res.render('./loginPages/order', {isLoggedIn: true, user: req.session._user, order: order});
  } catch (e){
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/place-order', async (req: Request, res: Response) => {
    await checkoutController.checkout(req, res);
});


export default router;

