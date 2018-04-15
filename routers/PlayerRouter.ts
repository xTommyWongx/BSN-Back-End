import {Router, Request, Response} from 'express';
import PlayerService from '../services/PlayerService';

export default class PlayerRouter {
    constructor(private playerService: PlayerService){

    }
    router():Router{
        let router:Router = Router();
        router.get('/leaveTeam',this.leaveTeam); //leave current team
        router.post('/joinTeam',this.joinTeam); //request to join team
        router.get('/getRequests',this.getRequests);//get the requests from managers to join them
        router.post('/acceptClub',this.acceptClub); // accept the invitation to join the club
        router.post('/rejectClub',this.rejectClub); // reject invitation

        return router;
    }
    leaveTeam = (req: Request, res: Response)=>{
        console.log("leave team", req.user);
        if(req.user){
            return this.playerService.leaveTeam(req.user.id)
                        .then(()=>{
                            res.send();
                        }).catch((err)=>{
                            console.log(err);
                            res.json(err);
                        })
        } else {
            return ;
        }
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
    acceptClub = (req: Request, res: Response) => {
        
        console.log(req.body,"..accept club ");
        if(req.user){
            return this.playerService.acceptClub(req.user.id, req.body.team_id)
                .then(()=>{
                    if(req.user){
                    return this.playerService.clearRequest(req.user.id, req.body.manager_id)
                                .then(()=>{
                                    res.send();
                                })
                    }else return;
                })
                .catch(err=>{
                    console.log(err);
                    res.json(err);
                })
        }else{
            return;
        }
    }

    rejectClub = (req: Request, res: Response) => {
        if(req.user){
            return this.playerService.rejectClub(req.user.id, req.body.manager_id)
                        .then(()=>{
                            res.send();
                        }).catch(err=>{
                            console.log(err);
                            res.send(err);
                        })
        } else {
            return;
        }
    }
}