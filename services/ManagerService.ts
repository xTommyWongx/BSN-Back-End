import * as Knex from 'knex';

export default class ManagerService {
    constructor(private knex: Knex){

    }
    playerMarket = ()=>{
        return this.knex.select().from('users')
                    .where({'team_id':null,
                            'status': 'player'
                            }); 
    }
    playerInfo = (req: Request, res: Response)=>{

    }
    kickout = (req: Request, res: Response)=>{

    }

    createTeam = (manager_id:number, club:Models.Team)=>{
        return this.knex('teams')
            .returning('team_id')
            .insert({
                teamname: club.clubName,
                numberOfPlayers: club.numberOfPlayers,
                manager_id: manager_id
            }).then((id)=>{
                console.log("first");
                return this.knex('users')
                    .update('team_id',id[0])
                    .where('user_id',manager_id);
            });
    }
    
    join_tournament = (req: Request, res: Response)=>{

    }
    cancel_tournament = (req: Request, res: Response)=>{

    }
    uploadFlag = (req: Request, res: Response)=>{

    }
    updateTeam = (req: Request, res: Response)=>{

    }
    invitePlayer = (manager_id:number, player_id:number) => {
        return this.knex('requests').insert({
            player_id: player_id,
            manager_id: manager_id,
            request_to_player: true,
            request_to_manager: false
        })
    }
    invitedPlayers = (manager_id:number)=>{
        console.log("or here");
        return this.knex.select().from('requests')
                   .innerJoin('users','users.user_id','player_id')
                    .where({
                        manager_id: manager_id,
                        request_to_player: true
                    });
    }
    cancelInvitation = (manager_id:number, player_id:number) => {
        console.log(manager_id, player_id,"info");
        return this.knex('requests').where({
            player_id: player_id,
            manager_id: manager_id,
            request_to_player: true
        }).del();
    }
    getRequests = (manager_id:number)=>{
        
        return this.knex('requests')
            .innerJoin('users','users.user_id','player_id')
            .where({
                manager_id: manager_id,
                request_to_manager: true
            });
        }
}