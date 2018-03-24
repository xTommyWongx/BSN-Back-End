import {Router, Request, Response} from 'express';
import OrganizerService from '../services/OrganizerService';

export default class OrganizerRouter {
    constructor(private organizerService: OrganizerService){

    }
    router():Router{
        let router:Router = Router();

        return router;
    }
}