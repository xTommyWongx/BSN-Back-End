import * as Knex from 'knex';

export default class AuthService {
    constructor(public knex: Knex){}
    
    async login(facebookId: number, facebookUserName: string){
        try{
            // check if user exits
            const result = await this.knex.select()
                .from('users')
                .where('facebook_id', facebookId)
                
            if (result.length === 0) {
                return await this.knex
                    .insert({
                        facebook_id: facebookId,
                        firstname: facebookUserName
                    })
                    .into('users')
            }
        } catch {
            throw new Error('Error from AuthService');
        }

        return;
    }

    register(){
        
    }
}