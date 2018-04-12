import { Router, Request, Response } from 'express';
import ManagerService from '../services/ManagerService';

export default class ManagerRouter {
    constructor(private managerService: ManagerService) {

    }
    router(): Router {
        let router: Router = Router();
        router.get('/playerMarket', this.playerMarket);  //send available players
        router.get('/playerDetails/:id', this.playerInfo);   //send individual player info
        router.delete('/kickPlayer/:id', this.kickout);  //kickout player from the team
        router.post('/createTeam', this.createTeam); //create team
        router.post('/joinTournament', this.joinTournament);    //request to join tournament
        router.delete('/cancelTournament/:teamId/:tournamentId', this.cancel_tournament); //cancel request to join tournament
        router.post('/uploadFlag', this.uploadFlag); //upload team flag
        router.put('/updateTeam', this.updateTeam); //update team info
        router.post('/invitePlayer', this.invitePlayer); //invite player to club
        router.post('/cancelInvitation',this.cancelInvitation); //cancel invitation
        router.get('/getRequests',this.getRequests); //get the requests from players to join the team

        return router;
    }
    playerMarket = (req: Request, res: Response) => {
        return this.managerService.playerMarket()
            .then((players) => {
                if (req.user) {
                    return this.managerService.invitedPlayers(req.user.id)
                        .then((invitedPlayers) => {
                            players = players.filter((user: any) => {
                                let check: boolean = true;
                                invitedPlayers.forEach((elem: any) => {
                                    if (user.user_id === elem.player_id) {
                                        check = false;
                                    }
                                })
                                return check;
                            })
                            res.json({ players, invitedPlayers });
                        })
                }else{
                    return;
                }
            }).catch((err) => {
                console.log(err);
                res.json(err);
            })
    }

    playerInfo = (req: Request, res: Response) => {

    }

    kickout = (req: Request, res: Response) => {

    }
    createTeam = (req: Request, res: Response) => {
        console.log(req.body,"create");
        if(req.user){
            return this.managerService.createTeam(req.user.id, req.body)
                    .then(()=>{
                        console.log("last")
                        res.send();
                    }).catch(err=>{
                        console.log(err);
                    })
        }else{
            return;
        }
        // return this.managerService.createTeam
    }

    joinTournament = (req: Request, res: Response) => {
        this.managerService.join_tournament(req.body.data.tournamentId, req.body.data.teamId)
            .then(() => {
                res.send();
            })
            .catch(err => res.sendStatus(500))
    }

    cancel_tournament = (req: Request, res: Response) => {

    }
    uploadFlag = (req: Request, res: Response) => {

    }
    updateTeam = (req: Request, res: Response) => {

    }
    invitePlayer = (req: Request, res: Response) => {
        
        if (req.user) {
            return this.managerService.invitePlayer(req.user.id, req.body.id)
                .then(() => {
                    res.send();
                }).catch(err => {
                    console.log(err);
                    res.send(err);
                })
        } else {
            return;
        }
    }
    
    cancelInvitation = (req: Request, res: Response) => {
        if(req.user){
            console.log("id,",req.body.id);
            return this.managerService.cancelInvitation(req.user.id, req.body.id)
                .then(()=>{
                    res.send();
                }).catch(err => {
                    console.log(err);
                    res.send(err);
                })
        }else{
            return;
        }
    }

    getRequests = (req: Request, res: Response) => {
        console.log(req.user,"user");
        if(req.user){
            return this.managerService.getRequests(req.user.id)
                .then(requests => {
                    console.log("requests..",requests)
                    res.json(requests);
                }).catch(err => {
                    console.log(err);
                    res.json(err);
                })
        }else{
            return;
        }
    }
}