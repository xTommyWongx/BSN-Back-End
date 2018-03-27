import {Router, Request, Response} from 'express';
import OrganizerService from '../services/OrganizerService';

export default class OrganizerRouter {
    constructor(private organizerService: OrganizerService){ }
    
    router():Router {
        let router:Router = Router();
        router.post('/tournament', this.create);

        return router;
    }

    private create = async (req: Request, res: Response) => {
        try {
            await this.organizerService.create(req.body);
            res.json({success: true});
        } catch (err) {
            res.sendStatus(500);
        }
    }
}