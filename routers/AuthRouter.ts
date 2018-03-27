import { Router, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import axios from 'axios';
import * as jwt from 'jwt-simple';
import config from '../config/config';


export default class AuthRouter {
    constructor(private authService: AuthService) {

    }
    router(): Router {
        let router: Router = Router();
        router.post('/login', this.login);
        router.post('/register', this.register);
        router.post('/facebook', this.facebook);

        return router;
    }


    facebook = async (req:Request, res:Response) => {
        if(req.body.access_token) {
            try {
                const accessToken = req.body.access_token;
                let data = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`);
                
                console.log(data)
                if(!data.data.error) {
                    const facebookId = parseInt(data.data.id);
                    const facebookUserName = data.data.name;

                    await this.authService.login(facebookId, facebookUserName)
                        let payload = {
                            id: facebookId
                        }

                        let token = jwt.encode(payload, config.jwtSecret);
                        res.json({
                            token: token
                        });
                    }
                } catch(err) {
                    res.sendStatus(401);
                }
            } else {
                res.sendStatus(401);
            }
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
                res.status(200).json({ success: true, msg: "Successfully registered" });
            }).catch((err) => {
                console.log("err, ", err);
                if (err === "Email already in use") {
                    res.json({ success: false, msg: err })
                } else {
                    res.status(500).json(err);
                }
            });
    }
}