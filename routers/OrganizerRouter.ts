import {Router, Request, Response} from 'express';
import OrganizerService from '../services/OrganizerService';

export default class OrganizerRouter {
    constructor(private organizerService: OrganizerService){ }
    
    router():Router {
        let router:Router = Router();
        router.get('/tournament', this.index); // get all tournaments post for organizer and player
        router.get('/tournament/team/:id', this.indexForManager); // get all tournaments post for manager
        router.get('/tournament/:id', this.get); // get single tournament
        router.post('/tournament', this.create); // post tournament
        router.put('/tournament/:id', this.update); // update tournament
        router.delete('/tournament/:id', this.delete); // delete tournament
        router.post('/tournament/score', this.updateScore);
        router.get('/tournament/:id/ranking', this.getRanking);
        router.get('/tournament/:id/fixture', this.getFixture)  //get tournament fixture
        router.get('/tournament/:id/upcomingFixture', this.getUpcomingFixture)  //get upcoming tournament fixture
        router.get('/tournament/:tournamentId/fixture/:fixtureId', this.getEditFixture) // get edit tournament fixture info
        router.put('/tournament/:tournamentId/fixture/:fixtureId', this.updateFixture) // update tournament fixture info
        router.get('/tournament/:id/getteaminfo', this.getTeamInfo) // get team who joint the tournament for fixture
        router.post('/tournament/:id/createfixture', this.createTournamentFixture) // add fixture to tournament
        router.post('/tournament/updateScore', this.updateScore);
        router.get('/getRequests', this.getRequests); // check if there are join tournament requests from teams
        router.post('/acceptJoinTournament/:id', this.acceptJoinTournament) // accept join tournament request
        router.delete('/rejectJoinTournament/:id', this.rejectJoinTournament) // reject join tournament request

        return router;
    }

    // get all tournaments post for organizer and player
    private index = async (req: Request, res: Response) => {
        try {
            let result = await this.organizerService.index();
            res.json(result);
        }
        catch (err) {
            res.sendStatus(500);
        }
    }

    // get all tournaments post for manager
    private indexForManager = async (req: Request, res: Response) => {
        try {
            let result = await this.organizerService.indexForManager(req.params.id);
            res.json(result.rows);
        }
        catch (err) {
            res.sendStatus(500);
        }
    }

    // get single tournament
    private get = async (req: Request, res: Response) => {
        try {
            let result = await this.organizerService.get(req.params.id);
            res.json(result);
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500);
        }
    }

    // create tournament 
    private create = async (req: Request, res: Response) => {
        try {
            if(req.user) {
                await this.organizerService.create(req.user.id, req.body.tournamentFormValue);
                res.json({success: true});
            }
        }
        catch (err) {
            res.sendStatus(500);
        }
    }

    // update tournament 
    private update = async (req: Request, res: Response) => {
        try {
            await this.organizerService.update(req.params.id, req.body.updateFormData);
            res.json({success: true});
        }
        catch (err) {
            res.sendStatus(500);
        }
    }

    //delete tournament
    private delete = async (req: Request, res: Response) => {
        try {
            await this.organizerService.delete(req.params.id);
            res.json({success: true});
        }
        catch (err) {
            res.sendStatus(500);
        }
    }

    // get fixture for tournament
    private getFixture = async (req: Request, res: Response) => {
        try {
            let result = await this.organizerService.getFixture(req.params.id)
            res.json(result);
        }
        catch (err){
            console.log(err)
            res.sendStatus(500);
        }
    }

    private getUpcomingFixture = async (req: Request, res: Response) => {
        try {
            let result = await this.organizerService.getUpcomingFixture(req.params.id)
            res.json(result);
        }
        catch (err){
            console.log(err)
            res.sendStatus(500);
        }
    }

   // get edit tournament fixture info
    private getEditFixture = async (req: Request, res: Response) => {
        try {
            let result = await this.organizerService.getEditFixture(req.params.fixtureId);
            res.json(result);
        }
        catch (err) {
            res.sendStatus(500);
        }
    }

    //update tournament fixture
    private updateFixture = async (req: Request, res: Response) => {
        try {
            // console.log(req.body.fixtureValue);
            await this.organizerService.updateFixture(req.params.fixtureId, req.body.fixtureValue);
            res.send();
        }
        catch (err) {
            res.sendStatus(500);
        }
    }

    // get teams who joint the tournament for fixture
    private getTeamInfo = async (req: Request, res: Response) => {
        try {
            let result = await this.organizerService.getTeamInfo(req.params.id)
            res.json(result);
        }
        catch {
            res.sendStatus(500);
        }
    }

    // add fixture to tournament
    private createTournamentFixture = async (req: Request, res: Response) => {
        try {
            await this.organizerService.addFixture(req.params.id, req.body.fixtureValue);
            res.json({success: true});
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500);
        }
    }

    private updateScore = (req: Request, res: Response) => {
        return this.organizerService.updateScore(req.body.fixture, req.body.score)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    }

    private getRanking = (req: Request, res: Response) => {
        console.log(req.params.id);
        return this.organizerService.getRanking(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    }

    // check if there are join tournament requests from teams
    private getRequests = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                let result = await this.organizerService.getRequests(req.user.id);
                res.json(result.rows);
            }
        }
        catch (err) {
            res.json(err);
        }
    }

    // accept join tournament request
    private acceptJoinTournament = async (req: Request, res: Response) => {
        try {
            await this.organizerService.acceptJoinTournament(req.params.id, req.body.teamId, req.body.requestId)
            res.send();
        }
        catch (err) {
            res.sendStatus(500);
        }
    }

    // reject join tournament request
    private rejectJoinTournament = async (req: Request, res: Response) => {
        try {
            await this.organizerService.rejectJoinTournament(req.params.id);
            res.send();
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500);            
        }
    }
}