import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import passport from './init-passport';
import * as Knex from 'knex';


export default  (knex: Knex) => {
    
    let app = express();
    let auth = passport(app, knex);
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    return {
        app: app,
        auth: auth
    }
}
