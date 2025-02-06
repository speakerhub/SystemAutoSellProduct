import express, { Request, Response, Router } from "express";
import Cartcontroller from "@controllerscart.controller";

const router: Router = express.Router();

router.get('/carts', async (req: Request, res: Response) => {
  if (req.session && req.session._user) {
    res.render('./shop/cart', {isLoggedIn: true, user: req.session._user}); // Lưu trữ đối tượng User trong session
  } else {
    res.render('./shop/cart', {isLoggedIn: false, user: null}); // L}); // L
  }
});

router.get('/get-data-carts', async (req: Request, res: Response) => {
  if(req.session && req.session.cart){
    res.status(200).json({message: 'Cart get done', cart: req.session.cart});
  }else{
    res.status(404).json({message: 'Cart is empty', cart: null});
  }
})

router.get('/add-to-carts/:id', async (req: Request, res: Response) => {
  await Cartcontroller.addToCart(req, res);
});

router.get('/add-to-carts-with-count/:id', async (req: Request, res: Response) => {
  await Cartcontroller.addToCartWithCount(req, res);
});

router.delete('/remove-from-carts/:productId', async (req: Request, res: Response) => {
  await Cartcontroller.removeFromCart(req, res);
})

export default router;

