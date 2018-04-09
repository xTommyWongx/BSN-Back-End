import {Router, Request, Response} from 'express';
import OrganizerService from '../services/OrganizerService';

export default class OrganizerRouter {
    constructor(private organizerService: OrganizerService){ }
    
    router():Router {
        let router:Router = Router();
        router.get('/tournament', this.index); // get all tournaments
        router.get('/tournament/:id', this.get); // get single tournament
        router.post('/tournament', this.create); // post tournament
        router.put('/tournament/:id', this.update); // update tournament
        router.delete('/tournament/:id', this.delete); // delete tournament
        router.get('/tournament/:id/fixture', this.getFixture)  //get tournament fixture
        router.get('/tournament/:id/getteaminfo', this.getTeamInfo) // get team who joint the tournament for fixture
        router.post('/tournament/:id/addfixture', this.addTournamentFixture) // add fixture to tournament

        return router;
    }

    // get all tournament post
    private index = async (req: Request, res: Response) => {
        try {
            let result = await this.organizerService.index();
            res.json(result);
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
    private addTournamentFixture = async (req: Request, res: Response) => {
        try {
            await this.organizerService.addFixture(req.params.id, req.body);
            res.json({success: true});
        }
        catch (err) {
            res.sendStatus(500);
        }
    }

}