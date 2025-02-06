import { NextFunction, Request, Response } from "express";
import session from "@typesexpress-session";
import User, { UserRole } from "@entities/User";

const checkLogin = (req: any, res: Response, next: NextFunction ) => {
   if (req.session && req.session._user) {
        if(req.session._user.Role == UserRole.Admin) {
            return res.render('./pages/dashboard', {isLoggedIn: true, user: req.session._user}); // Lưu trữ đối tượng User trong session
        } else {
            return res.render('./shop/index', {isLoggedIn: true, user: req.session._user}); // Lưu trữ đối tượng User trong session
        }
    } else {
        next();
    }
};

export default checkLogin;