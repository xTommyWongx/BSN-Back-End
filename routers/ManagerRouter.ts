import {Router, Request, Response} from 'express';
import ManagerService from '../services/ManagerService';

export default   class ManagerRouter {
    constructor(private managerService: ManagerService){

    }
    router():Router{
        let router:Router = Router();
        router.get('/playerMarket',this.playerMarket);  //send available players
        router.get('/playerDetails/:id',this.playerInfo);   //send individual player info
        router.delete('/player/:id',this.kickout);  //kickout player from the team
        router.post('/createTeam',this.createTeam); //create team
        router.post('/joinTournament',this.join_tournament);    //request to join tournament
        router.delete('/cancelTournament/:teamId/:tournamentId',this.cancel_tournament); //cancel request to join tournament
        router.post('/uploadFlag',this.uploadFlag); //upload team flag
        router.put('/updateTeam/:id',this.updateTeam); //update team info

        return router; 
    }
    playerMarket = (req: Request, res: Response)=>{

    }
    playerInfo = (req: Request, res: Response)=>{

    }
    kickout = (req: Request, res: Response)=>{

    }
    createTeam = (req: Request, res: Response)=>{

    }
    join_tournament = (req: Request, res: Response)=>{

    }
    cancel_tournament = (req: Request, res: Response)=>{

    }
    uploadFlag = (req: Request, res: Response)=>{

    }
    updateTeam = (req: Request, res: Response)=>{

    }
}