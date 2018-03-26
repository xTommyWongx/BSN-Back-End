import { Router } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import * as Knex from 'knex';

const NODE_ENV = process.env.NODE_ENV || 'development';
const knexFile = require('./knexfile')[NODE_ENV];
const knex = Knex(knexFile);
const port = process.env.PORT || 8080;


import ManagerRouter from './routers/ManagerRouter';
import UserRouter from './routers/UserRouter';
import PlayerRouter from './routers/PlayerRouter';
import OrganizerRouter from './routers/OrganizerRouter';
import AuthRouter from './routers/AuthRouter';

import UserService from './services/UserService';
import PlayerService from './services/PlayerService';
import ManagerService from './services/ManagerService';
import OrganizerService from './services/OrganizerService';
import AuthService from './services/AuthService';

let userService = new UserService(knex);
let playerService = new PlayerService(knex);
let managerService = new ManagerService(knex);
let organizerService = new OrganizerService(knex);
let authService = new AuthService(knex);

import initapp from './utils/init-app';

const {app} = initapp(knex);

app.use('/api/users', new UserRouter(userService).router()); // users commom functions
app.use('/api/players', new PlayerRouter(playerService).router());  // specific to player fuctions
app.use('/api/managers', new ManagerRouter(managerService).router()); // specific to manager functions
app.use('/api/organizers', new OrganizerRouter(organizerService).router()); // specific to organizer functions
app.use('/api/auth', new AuthRouter(authService).router()); //login and registration of users

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
