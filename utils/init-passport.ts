import * as express from 'express';
import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import * as Knex from 'knex';
import config from '../config/config';


const ExtractJwt = passportJWT.ExtractJwt;

export default  (app:express.Application, knex: Knex)=>{
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },async (payload,done)=>{
        const user = await knex.select().table('users').where(payload);
        if (user) {
            return done(null, { id: user[0].user_id,
                                team_id: user[0].team_id,
                                 status: user[0].status});
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        },
        session: function(){
            return passport.session();
        }
        
    };
}