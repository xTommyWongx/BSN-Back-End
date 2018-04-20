import * as Knex from 'knex';
import * as bcrypt from 'bcrypt';

export default class AuthService {
    constructor(public knex: Knex) { }

    // facebook login
    async login(facebookId: number, facebookUserName: string) {
        try {
            // check if user exits
            const result = await this.knex.select()
                .from('users')
                .where('facebook_id', facebookId)
                .returning('user_id')

            if (result.length === 0) {
                let user =  await this.knex
                    .insert({
                        facebook_id: facebookId,
                        firstname: facebookUserName
                    })
                    .into('users')
                    .returning('user_id')
                
                return user[0];
            } else {
                return result[0].user_id;
            }
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
    // compare password
    comparePassword(password: string, hash: string, callback: (err: Error | null, match: boolean) => void) {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);
        });
    }

    // check if email is already used;
    checkEmail(email: string) {
        return this.knex.select().from('users').where('email', email);
    }

    // register user
    encrypt(user: Models.SignUpUser) {             
    return new Promise((resolve, reject) => { 
        return bcrypt.genSalt(10, (err, salt) => {  
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) {
                        console.log('bcrypt err', err);
                        reject(err);                    
                    }                
                    resolve(hash)
                })
            })
        })
    }
    // separated to catch the errors that might occer during insert
    register(hash:any, user:Models.SignUpUser){
        user.password = hash;
        return this.knex('users').insert(user);
    }
}
