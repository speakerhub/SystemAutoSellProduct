import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import "reflect-metadata";
import { AppDataSource } from "@config/data-source";
import session from 'express-session';
import path from 'path';
import cookieParser from "cookie-parser";

// import routes
import loginroutes from "@routes/login";
import registerroutes from "@routes/register";
import homeroutes from "@routeshome";
import profileroutes from "@routes/profile";
import adminroutes from "@routes/admin";
import cartsroutes from "@routes/cart";
import productsroutes from "@routesproduct";
import categoriesroutes from "@routes/category";
import checkoutroutes from "@routes/checkout";
import orderroutes from "@routesorder"
// 
const app: Express = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(cookieParser());

// db
AppDataSource.initialize().then(() => {
    console.log("Connected to the database");
    // start your server here...
}).catch(err => {
    console.error("Error connecting to the database", err);
    process.exit(1); // exit application with error
})

// app.set
// ejs
app.set('view engine', 'ejs');
app.set('views', './src/views'); 

// app.use
// session
app.use(
  session({
      secret: `${process.env.SESSION_KEY}`, 
      resave: false, 
      saveUninitialized: true, 
      cookie: {
          secure: false, 
          maxAge: 1000 * 60 * 60 * 24, 
      },
  })
);
// static files middleware
app.use(express.static(path.join(__dirname, '../public')));
// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// routes
app.use(loginroutes);
app.use(registerroutes);
app.use(homeroutes); 
app.use(profileroutes);
app.use(adminroutes);
app.use(cartsroutes);
app.use(productsroutes);
app.use(categoriesroutes);
app.use(checkoutroutes);
app.use(orderroutes);