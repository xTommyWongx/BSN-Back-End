import {Router, Request, Response} from 'express';
import AuthService from '../services/AuthService';

export default class AuthRouter {
    constructor(private authService: AuthService){

    }
    router(){
        let router = Router();
        router.get('/login',this.login);
        router.post('/register',this.register);

        return router;
    }
    login(req:Request, res:Response){

    }
    register(req:Request, res:Response){

    }
}