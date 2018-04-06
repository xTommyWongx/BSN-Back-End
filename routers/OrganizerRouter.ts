import {Router, Request, Response} from 'express';
import OrganizerService from '../services/OrganizerService';

export default class OrganizerRouter {
    constructor(private organizerService: OrganizerService){ }
    
    router():Router {
        let router:Router = Router();
        router.get('/tournament', this.index);
        router.post('/tournament', this.create);
        router.put('/tournament/:id', this.update);
        router.delete('/tournament/:id', this.delete);

        return router;
    }

    // get all tournament post
    private index = async (req: Request, res: Response) => {
        try {
            const result = await this.organizerService.index()
            res.json(result);
        }
        catch (err) {
            res.sendStatus(500);
        }
        
    }

    // create tournament 
    private create = async (req: Request, res: Response) => {
        try {
            await this.organizerService.create(req.body.tournamentFormValue);
            res.json({success: true});
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
}