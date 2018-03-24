import { Router, Request, Response } from 'express';
import AuthService from '../services/AuthService';

export default class AuthRouter {
    constructor(private authService: AuthService) {

    }
    router(): Router {
        let router: Router = Router();
        router.get('/login', this.login);
        router.post('/register', this.register.bind(this));

        return router;
    }
    login = (req: Request, res: Response) => {

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
                res.status(200).json({ msg: "Successfully registered" });
            }).catch((err) => {
                console.log("err, ", err);
                if (err === "Email already in use") {
                    res.json({ msg: err })
                } else {
                    res.status(500).json(err);
                }
            });

    }
}