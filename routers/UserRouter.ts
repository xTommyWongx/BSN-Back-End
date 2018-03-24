import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserRouter {
    constructor(private userService: UserService) {

    }
    router(): Router {
        let router = Router();
        router.get('/profile', this.getProfile); //send profile info
        router.get('/dashboard', this.dashboard); //send dashboard info
        router.get('/teams', this.teamsList); //send all teams list
        router.get('/team/:id', this.teamDetails); //send team detail 
        router.get('/tournaments', this.tournamentsList); //send all tournaments list
        router.get('/tournament/:id', this.tournamentDetail); //send tournament details
        router.post('/', this.post.bind(this));

        return router;
    }
    getProfile = (req: Request, res: Response) => {

    }
    dashboard = (req: Request, res: Response) => {

    }
    teamsList = (req: Request, res: Response) => {

    }
    teamDetails = (req: Request, res: Response) => {

    }
    tournamentsList = (req: Request, res: Response) => {

    }
    tournamentDetail = (req: Request, res: Response) => {

    }
    
    post = (req: Request, res: Response) => {
        const body:Models.BasicUserInforamtion = req.body;

        return this.userService.createNewInformation(body)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    }
}