import * as knex from 'knex';

export default class UserService {
    constructor(private knex : knex){

    }
    createNewInformation(basicUserInformation: Models.BasicUserInforamtion){
        return this.knex('users').insert(basicUserInformation);
    }

    getProfile(){

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