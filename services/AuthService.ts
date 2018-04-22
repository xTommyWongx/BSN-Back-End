import * as Knex from 'knex';
import * as bcrypt from 'bcrypt';
import * as AWS from 'aws-sdk';
import { v1 } from 'uuid';
import axios from 'axios';
import { SSL_OP_CISCO_ANYCONNECT } from 'constants';

const s3 = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    signatureVersion: 'v4',
    region: 'ap-northeast-2'
});

export default class AuthService {
    constructor(public knex: Knex) { }

    // facebook login
    async login(facebookId: number, facebookUserName: string, firstname: string, lastname: string, picture: string) {
        try {
            // check if user exits
            const result = await this.knex.select()
                .from('users')
                .where('facebook_id', facebookId)

            if (result.length === 0) {
                let userId = await this.knex
                    .insert({
                        facebook_id: facebookId,
                        firstname: firstname,
                        lastname: lastname
                    })
                    .into('users')
                    .returning('user_id')
                    .then(data => data[0]);

                // upload facebook pro pic to S3
                const key = `${userId}/${v1()}.jpeg`;
                let img = 'https://s3.ap-northeast-2.amazonaws.com/building-sports-network/' + key; //get back the img url from S3
                let buffer;

                // signedUrl for push
                const url = (s3.getSignedUrl('putObject', {
                    Bucket: 'building-sports-network',
                    ContentType: 'image/jpeg',
                    Key: key
                }));

                // convert img url to buffer / use dataurl for local file
                await axios.get(picture, {
                    responseType: 'arraybuffer'
                }).then(response => { buffer = new Buffer(response.data, 'binary') })

                // restful put 
                await axios.put(url, buffer, {
                    headers: {
                        'Content-Type': 'image/jpeg'
                    }
                })

                // store back to our database
                return this.knex('users').update('image', img)
                            .where('user_id', userId);
            }

            return;
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
    register(hash: any, user: Models.SignUpUser) {
        user.password = hash;
        return this.knex('users').insert(user);
    }
}
