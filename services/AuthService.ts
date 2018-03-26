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

            if (result.length === 0) {
                return await this.knex
                    .insert({
                        facebook_id: facebookId,
                        firstname: facebookUserName
                    })
                    .into('users')
            }

            return;
        } catch (err) {
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
    register(user: Models.SignUpUser) {
        return new Promise((resolve, reject) => {
            return bcrypt.genSalt(10, (err, salt) => {  //genSalt itself is not promise, only callback
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) {
                        console.log('bcrypt err', err);
                        throw err;
                    }
                    user.password = hash;
                    // save the new user in the db
                    console.log("before insert");
                    resolve();
                })
            })
        }).then(() => this.knex('users').insert(user));
    }
}
