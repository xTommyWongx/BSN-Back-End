import { Router, Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class UserRouter {
    constructor(private teamService: TeamService) { }

    router(): Router {
        let router = Router();
        router.get('/', this.teamList);
        router.get('/:teamId', this.team);
        router.get('/:teamId/status?', this.teamStatus);
        return router;
    }

    teamList = (req: Request, res: Response) => { }

    team = (req: Request, res: Response) => {
        return this.teamService.getTeam(req.params.teamId)
            .then(data => res.json(data[0]))
            .catch(err => res.status(500).json(err));
    }

    teamStatus = (req: Request, res: Response) => {
        // big O presentation
        const typeMap = {
            squad: this.squad,
            fixtures: this.fixtures,
            upcomingMatch: this.upcomingMatch
        }

        if (typeMap.hasOwnProperty(req.query.type)) {
            return typeMap[req.query.type](req, res);
        } else {
            return res.status(500).json('Error Message: Incorrect req.query');
        }
    }

    squad = (req: Request, res: Response) => {
        return this.teamService.getSquad(req.params.teamId)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    }

    fixtures = (req: Request, res: Response) => {
        return this.teamService.getFixtures(req.params.teamId)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    }

    upcomingMatch = (req: Request, res: Response) => {
        return this.teamService.getFixtures(req.params.teamId)
            .then(data => res.json(data[0]))
            .catch(err => res.status(500).json(err));
    }
}