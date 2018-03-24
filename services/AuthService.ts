import * as Knex from 'knex';
import * as bcrypt from 'bcrypt';

export default class AuthService {
    constructor(private knex: Knex) {

    }
    login() {

    }
    // check if email is already used;
    checkEmail(email: string) {
        return this.knex.select().from('users').where('email', email);
    }

    // register user
    register(user: any) {
        return bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    console.log('bcrypt err', err);
                    throw err;
                }
                user.password = hash;
                // save the new user in the db
                console.log("testme here");
                return this.knex('users')
                    .insert({
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        password: user.password,
                        status: user.role
                    });
            })
        })
    }
}
