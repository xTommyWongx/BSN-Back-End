import { Router, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import config from '../config/config';
import * as jwt from 'jwt-simple';

export default class AuthRouter {
    constructor(private authService: AuthService) {

    }
    router(): Router {
        let router: Router = Router();
        router.post('/login', this.login);
        router.post('/register', this.register);

        return router;
    }

    login = (req: Request, res: Response) => {
        console.log("login", req.body);
        return this.authService.checkEmail(req.body.email)
            .then((user) => {
                if (user < 1) {
                    res.json({ success: false, msg: "User not found" });
                } else {
                    this.authService.comparePassword(req.body.password, user[0].password, (err, match) => {
                        if (err) throw err;
                        if (match) {
                            const token = jwt.encode({ data: user[0] }, config.jwtSecret);
                            res.json({
                                success: true,
                                token: token,
                                user: user[0]
                            })
                        }

                    })
                }
            })
    }

    register = (req: Request, res: Response) => {
        return this.authService.checkEmail((req.body.email))
            .then((result) => {
                if (result.length > 0) {
                    let msg = "Email already in use";
                    throw msg;
                }
            }).then(() => {
                return this.authService.register(req.body);
            }).then(() => {
                res.status(200).json({success: true,  msg: "Successfully registered" });
            }).catch((err) => {
                console.log("err, ", err);
                if (err === "Email already in use") {
                    res.json({success:false, msg: err })
                } else {
                    res.status(500).json(err);
                }
            });

    }
}