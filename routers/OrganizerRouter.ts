import {Router, Request, Response} from 'express';
import OrganizerService from '../services/OrganizerService';

export default class OrganizerRouter {
    constructor(private organizerService: OrganizerService){ }
    
    router():Router {
        let router:Router = Router();
        router.get('/tournament', this.index);
        router.post('/tournament', this.create);

        return router;
    }

    // get all tournament post
    private index = async (req: Request, res: Response) => {
        try {
            const result = await this.organizerService.index()
            // res.json({success: true, result: result});
            res.json(result);
        }
        catch (err) {
            res.sendStatus(500);
        }
        
    }

    // create tournament 
    private create = async (req: Request, res: Response) => {
        try {
            await this.organizerService.create(req.body);
            res.json({success: true});
        }
        catch (err) {
            res.sendStatus(500);
        }
    }
}