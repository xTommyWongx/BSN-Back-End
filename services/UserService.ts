import * as knex from 'knex';

export default class UserService {
    constructor(private knex : knex){

    }

    createNewInformation(basicUserInformation: Models.BasicUserInforamtion){
        return this.knex('users').insert(basicUserInformation);
    }

    getProfile(userId:number){
        console.log('getProfile')
        return this.knex.select('firstname', 'lastname', 'position', 'location', 'status', 'image', 'users.team_id', 'teamname')
            .from('users')
            .leftJoin('teams', 'users.team_id', '=', 'teams.team_id')
            .where('user_id',userId);
    }

    editProfile(userId:number, modifier:{}){
        return this.knex('users')
            .where('user_id',userId)
            .update(modifier);
    }

    teamDetails(userId:number){
        return this.knex.select('*')
            .from('teams')
            .innerJoin('users','teams.team_id', '=', 'users.team_id')
            .where('user_id',userId);
    }

    dashboard(id: number){
       
    }
    teamsList(req: Request, res: Response){

    }
    
    tournamentsList(req: Request, res: Response){

    }
    tournamentDetail(req: Request, res: Response){

    }
}