import * as Knex from 'knex';

export default class PlayerService {
    constructor(private knex: Knex){

    }
    leaveTeam = (req: Request, res: Response)=>{

    }
    joinTeam = (req: Request, res: Response)=>{

    }
    getRequests = (player_id:number) => {
        return this.knex('requests').select()
                        .where({
                            player_id: player_id,
                            request_to_player: true
                        })
                        .innerJoin('users','users.user_id','manager_id')
                        // .innerJoin('teams','teams.team_id','users.user_id');
                        
    }
}