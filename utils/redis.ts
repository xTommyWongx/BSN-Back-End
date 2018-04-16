import * as redis from 'redis';

export const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});


let promiser = (resolve:any, reject:any) => {
  return (err:any, data:any) => {
    if(err) reject(err);
    resolve(data);
  };
};

export let storeUser = (socketID:any, user:any) => {
  return new Promise((resolve, reject) => {
    redisClient.setex(socketID, 60 * 60 * 1000, user, promiser(resolve, reject));
  });
};

export let getUser = (socketID:any) => {
  return new Promise((resolve, reject) => {
    redisClient.get(socketID, promiser(resolve, reject));
  });
};

