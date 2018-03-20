import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import passport from './init-passport';
import * as Knex from 'knex';


export default  (knex: Knex) => {
    
    let app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    app.use(cors());

    passport(app, knex);
    
    return {
        app: app,
    }
}
