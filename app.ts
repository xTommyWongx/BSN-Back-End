import * as dotenv from 'dotenv';
dotenv.config();

import * as socket from 'socket.io';
import * as Knex from 'knex';
import {storeUser, getUser, redisClient} from './utils/redis';

const NODE_ENV = process.env.NODE_ENV || 'development';
const knexFile = require('./knexfile')[NODE_ENV];
const knex = Knex(knexFile);
const port = process.env.PORT || 8080;


import ManagerRouter from './routers/ManagerRouter';
import UserRouter from './routers/UserRouter';
import PlayerRouter from './routers/PlayerRouter';
import OrganizerRouter from './routers/OrganizerRouter';
import TeamRouter from './routers/TeamRouter';
import AuthRouter from './routers/AuthRouter';

import UserService from './services/UserService';
import PlayerService from './services/PlayerService';
import ManagerService from './services/ManagerService';
import OrganizerService from './services/OrganizerService';
import TeamService from './services/TeamService';
import AuthService from './services/AuthService';

let userService = new UserService(knex);
let playerService = new PlayerService(knex);
let managerService = new ManagerService(knex);
let organizerService = new OrganizerService(knex);
let teamService = new TeamService(knex);
let authService = new AuthService(knex);

import initapp from './utils/init-app';


const { app, auth } = initapp(knex);
const http = require('http').Server(app);
const io = require('socket.io')(http);



app.use('/api/users', auth.authenticate(), new UserRouter(userService).router()); // users commom functions
app.use('/api/players',auth.authenticate(), new PlayerRouter(playerService).router());  // specific to player fuctions
app.use('/api/managers',auth.authenticate(), new ManagerRouter(managerService).router()); // specific to manager functions
app.use('/api/organizers',auth.authenticate(), new OrganizerRouter(organizerService).router()); // specific to organizer functions
app.use('/api/teams',auth.authenticate(), new TeamRouter(teamService).router()); // specific to team functions
app.use('/api/auth', new AuthRouter(authService).router()); //login and registration of users

io.on('connection', (socket: socket.Socket) => {
    let onlineUsers: any[] = [];

    console.log('user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    

    socket.on('event', (message) => {
        io.emit('event', { 'text': message });
    });

    socket.on('room.join', (data) => {
        
        console.log("join", data);
        Object.keys(socket.rooms).filter((r) => r != socket.id)
            .forEach((r) => socket.leave(r));

        setTimeout(() => {
            socket.join(data.roomNum);

            storeUser(socket.id, data.name)
                .then(() => {
                    let room = io.sockets.adapter.rooms[data.roomNum];
                    console.log('room.', room);
                    let onlineIds = Object.keys(room.sockets);
                    return Promise.all(onlineIds.map((id)=>{
                        return getUser(id);
                    })).then(res=>{
                        console.log('users ',res);
                        onlineUsers = res;
                        console.log('onlineUsers ',onlineUsers);
                        return res;
                    })
                    
                })
                .then((online) => {
                    console.log("onlnine users", online);  
                    redisClient.lrange(data.roomNum, 0, 20, (err, messages) => {
                        if (err) {
                            console.log(err);
                            io.emit('Error loading messages :(');
                            return;
                        }
                        messages.reverse();
        
                        if (Array.isArray(messages)) {
                            messages = messages.map(res => JSON.parse(res));
                        }
                        socket.emit('initial messages',messages);
                        socket.emit('online', online);
                        socket.broadcast.to(data.roomNum).emit('online',online);
                    });

                })
                .catch(err => {
                    console.log(err);
                });        
        }, 0);
    })

    socket.on('leave', (data) => {
        socket.join(data.roomNum);
        let room = io.sockets.adapter.rooms[data.roomNum];
        let onlineIds = Object.keys(room.sockets);
        return Promise.all(onlineIds.map((id)=>{
            return getUser(id);
        })).then(res=>{
            let users = res.filter(user =>{
                return user !== data.name;
            });
            return users;
        }).then((users)=>{
            socket.broadcast.to(data.roomNum).emit('online',users);
            socket.leave(data.roomNum);
        }).catch(err=>console.log(err));
    })
    

    socket.on('message', (e) => {
        const wholeMessage = {
            user: e.name,
            msg: e.msg,
            time: e.time
        };

        redisClient.lpush(e.room, JSON.stringify(wholeMessage), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            socket.emit('message', wholeMessage);
            socket.broadcast.to(e.room).emit('message', wholeMessage);
        })

    })
});

http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

