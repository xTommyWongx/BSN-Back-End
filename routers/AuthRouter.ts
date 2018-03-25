import { Router, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import axios from 'axios';
import * as jwt from 'jwt-simple';
import config from '../config/config';


export default class AuthRouter {
    constructor(private authService: AuthService) {

    }

    router(){
        let router = Router();
        router.post('/facebook',this.facebook);
        router.post('/register',this.register);

        return router;
    }
    
    private async facebook(req:Request, res:Response){
        if(req.body.access_token) {
            try {
                const accessToken = req.body.access_token;
                let data = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`);
                
                if(!data.data.error) {
                    // const facebookId = data.data.id;
                    // const facebookUserName = data.data.name;

                    // await this.authService.login(facebookId, facebookUserName)
                        let payload = {
                            id: accessToken
                        }

                        let token = jwt.encode(payload, config.jwtSecret);
                        res.json({
                            token: token
                        });
                }
            } catch {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
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