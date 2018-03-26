import * as knex from 'knex';

export default class UserService {
    constructor(private knex : knex){

    }

    createNewInformation(basicUserInformation: Models.BasicUserInforamtion){
        return this.knex('users').insert(basicUserInformation);
    }

    getProfile(userId:number){
        return this.knex.select('firstname', 'lastname', 'location', 'status', 'image', 'team_id')
            .from('users')
            .where('user_id',userId);
    }

    editProfile(userId:number, modifier:{}){
        return this.knex('users')
            .where('user_id',userId)
            .update(modifier)
    }

    dashboard(req: Request, res: Response){

    }
    teamsList(req: Request, res: Response){

    }
    teamDetails(req: Request, res: Response){

    }
    tournamentsList(req: Request, res: Response){

    }
    tournamentDetail(req: Request, res: Response){

    }
}