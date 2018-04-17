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

    dashboardWithTeam(id: number){
       return this.knex.select().from('users')
                    .where('user_id',id)
                    .innerJoin('teams','teams.team_id','users.team_id');
    }

    dashboardNoTeam(id: number){
        console.log("id",id);
        return this.knex.select().from('users')
                    .where('user_id',id);
    }

    teamDetails(userId:number){
        return this.knex.select('*')
            .from('teams')
            .innerJoin('users','teams.team_id', '=', 'users.team_id')
            .where('user_id',userId);
    }

    
    teamsList(req: Request, res: Response){

    }
    
    tournamentsList(req: Request, res: Response){

    }
    tournamentDetail(req: Request, res: Response){

    }
    uploadProfilePic(img:string,id: number){
        return this.knex('users').update('image',img)
                    .where('user_id', id);
    }
}