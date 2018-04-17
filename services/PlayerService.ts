import * as Knex from 'knex';

export default class PlayerService {
    constructor(private knex: Knex){

    }
    leaveTeam = (player_id:number)=>{
        return this.knex('users').update({team_id: null})
                        .where('user_id', player_id);
    }
    joinTeam = ()=>{

    }
    getRequests = (player_id:number) => {
        return this.knex('requests').select()
                        .where({
                            player_id: player_id,
                            request_to_player: true
                        })
                        .innerJoin('users','users.user_id','requests.manager_id')
                        .innerJoin('teams','teams.manager_id','requests.manager_id');
                        
    }
    // player joins the club
    acceptClub = (player_id:number,team_id:number) => {
        return this.knex('users').update('team_id',team_id)
                        .where('user_id',player_id);
    }

    rejectClub = (player_id:number, manager_id: number) => {
        console.log("reject request");
        return this.knex('requests').where({
            player_id,
            manager_id,
            request_to_player: true
        }).del();
    }

    // clear request from requests table
    clearRequest = (player_id:number, manager_id:number) => {
        return this.knex('requests').where({player_id,manager_id}).del();
    }
    
}