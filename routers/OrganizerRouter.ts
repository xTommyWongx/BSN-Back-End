import {Router, Request, Response} from 'express';
import OrganizerService from '../services/OrganizerService';

export default class OrganizerRouter {
    constructor(private organizerService: OrganizerService){ }
    
    router():Router {
        let router:Router = Router();
        router.get('/tournament', this.index); // get all tournaments
        router.get('/tournament/:id', this.get); // get single tournament
        router.get('/tournament/:id/fixture', this.getFixture)  //get tournament fixture
        router.post('/tournament', this.create); // post tournament
        router.put('/tournament/:id', this.update); // update tournament
        router.delete('/tournament/:id', this.delete); // delete tournament
        router.post('/tournament/score', this.updateScore);
        router.get('/tournament/:id/ranking', this.getRanking);

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
            console.log(err)
            res.sendStatus(500);
        }
    }

    private getFixture = async (req: Request, res: Response) => {
        try {
            console.log('OK')
            let result = await this.organizerService.getFixture(req.params.id)
            res.json(result);
        }
        catch (err){
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
}