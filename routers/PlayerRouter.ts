import {Router, Request, Response} from 'express';
import PlayerService from '../services/PlayerService';

export default class PlayerRouter {
    constructor(private playerService: PlayerService){

    }
    router(){
        let router = Router();
        router.put('/leaveTeam/:id',this.leaveTeam); //leave current team
        router.post('/joinTeam',this.joinTeam); //request to join team

        return router;
    }
    leaveTeam = (req: Request, res: Response)=>{
        
    }
    joinTeam = (req: Request, res: Response)=>{

    }
}