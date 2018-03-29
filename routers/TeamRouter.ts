import { Router, Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class UserRouter {
    constructor(private teamService: TeamService) { }

    router(): Router {
        let router = Router();
        router.get('/', this.getTeamList);
        router.get('/:teamId', this.getTeam);
        router.get('/:teamId/squad', this.getSquad);
        return router;
    }

    getTeamList = (req: Request, res: Response) => {

    }

    getTeam = (req: Request, res: Response) => {
        return this.teamService.getTeam(req.params.teamId)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    }

    getSquad = (req: Request, res: Response) => {
        return this.teamService.getSquad(req.params.teamId)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    }
}