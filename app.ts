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


import UserService from './services/UserService';
import PlayerService from './services/PlayerService';
import ManagerService from './services/ManagerService';

let userService = new UserService(knex);
let playerService = new PlayerService(knex);
let managerService = new ManagerService(knex);

import initapp from './utils/init-app';

const {app} = initapp(knex);


app.use('/api/users', new UserRouter(userService).router());
app.use('/api/players', new PlayerRouter(playerService).router());
app.use('/api/managers', new ManagerRouter(managerService).router());


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
