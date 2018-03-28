import {Router, Request, Response} from 'express';
import PlayerService from '../services/PlayerService';

export default class PlayerRouter {
    constructor(private playerService: PlayerService){

    }
    router():Router{
        let router:Router = Router();
        router.put('/leaveTeam/:id',this.leaveTeam); //leave current team
        router.post('/joinTeam',this.joinTeam); //request to join team
        router.get('/getRequests',this.getRequests);//get the requests from managers to join them

        return router;
    }
    leaveTeam = (req: Request, res: Response)=>{
        
    }
    joinTeam = (req: Request, res: Response)=>{

    }
    getRequests = (req: Request, res: Response)=>{
        console.log("user ",req.user);
        if(req.user){
            return this.playerService.getRequests(req.user.id)
                    .then((requests)=>{
                        console.log(requests,"requests");
                        res.json(requests)
                    }).catch((err)=>{
                        console.log(err);
                        res.json(err);
                    })
        }else{
            return;
        }
    }
}