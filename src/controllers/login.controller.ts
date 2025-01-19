import express, { Request, Response } from "express";
import LoginServices from "@services/login.services";
import User from "@entities/User";
import session from "@typesexpress-session";

class LoginController {

    static async getLoginPage(req: Request, res: Response) {
        try {
            return res.render('login');
        } catch (error) {
            return res.status(500).json({ message: "An error occurred", error });
        }
    }

    // Make this method async to use await
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                console.error("Email or password not provided");
                return null;
            }
            const result = await LoginServices.CheckLogin(email, password);
    
            if (!result) {
                return res.render('login', { errorMessage: 'Invalid credentials' });
            }
    
            req.session._user = result;
    
            return res.redirect('/');
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: "An error occurred", error });
        }
    }
    
}


export default LoginController;
