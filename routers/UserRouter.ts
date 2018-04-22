import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';
import * as AWS from 'aws-sdk';
import { v1 } from 'uuid';

const s3 = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    signatureVersion: 'v4',
    region: 'ap-northeast-2'
});

export default class UserRouter {
    constructor(private userService: UserService, 
                ) {

    }
    router(): Router {
        let router = Router();
        router.get('/', this.getProfile); //send profile info
        router.patch('/', this.editProfile);
        router.get('/getPresignedUrl', this.getPresignedUrl);//get the presigned url from aws
        router.put('/uploadPic', this.updateProfilePic);// update profile pic
        router.get('/dashboard', this.dashboard); //send dashboard info
        router.get('/teams', this.teamsList); //send all teams list
        router.get('/team/:id', this.teamDetails); //send team detail 
        router.get('/tournaments', this.tournamentsList); //send all tournaments list
        router.get('/tournament/:id', this.tournamentDetail); //send tournament details
        
        return router;
    }

    dashboard = (req: Request, res: Response) => {
        if (req.user) {
            console.log("req.user ", req.user);
            if (req.user.status === "organizer") {
                return;//todo organizer info
            } else if (req.user.status === "manager") {
                console.log("manager");
                if (req.user.team_id !== null) {//if manager has team
                    return this.userService.dashboardWithTeam(req.user.id)
                        .then((info) => {
                            console.log("info",info);
                            res.json(info[0]);
                        }).catch(err => {
                            console.log(err);
                            res.send(err);
                        })
                }else{// if manager doesn't have the team
                    console.log("no team");
                    return this.userService.dashboardNoTeam(req.user.id)
                        .then((info)=>{
                            console.log("info", info);
                            res.json(info[0]);
                        }).catch(err=>{
                            console.log(err);
                            res.send(err);
                        })
                }

            } else if (req.user.status === "player") {
                if (req.user.team_id !== null) {//if player has team
                    return this.userService.dashboardWithTeam(req.user.id)
                        .then((info) => {
                            res.json(info[0]);
                        }).catch(err => {
                            console.log(err);
                            res.send(err);
                        })
                }else{// if player doesn't have the team
                    return this.userService.dashboardNoTeam(req.user.id)
                        .then((info)=>{
                            res.json(info[0]);
                        }).catch(err=>{
                            console.log(err);
                            res.send(err);
                        })
                }
            }
            
        }else {
            return;
        }
    }

    getPresignedUrl = (req: Request, res: Response) => {
        if(req.user){
        const key = `${req.user.id}/${v1()}.jpeg`;
        s3.getSignedUrl('putObject', {
            Bucket: 'building-sports-network',
            ContentType: 'image/jpeg',
            Key: key
        },
        (err, url)=> res.send({key, url}))
      }
    }

    updateProfilePic = (req: Request, res: Response) => {
        if(req.user){
            return this.userService.uploadProfilePic(req.body.img, req.user.id)
                    .then(()=>{
                        console.log("upload successful");
                        res.json({
                            success: true,
                            msg: "Image uploaded"
                        });
                    }).catch(err=> console.log(err));
        } else 
            return;
    }

    teamsList = (req: Request, res: Response) => {

    }
    teamDetails = (req: Request, res: Response) => {

    }
    tournamentsList = (req: Request, res: Response) => {

    }
    tournamentDetail = (req: Request, res: Response) => {

    }

    getProfile = (req: Request, res: Response) => {
        console.log(req.user)
        if (req.user) {
            return this.userService.getProfile(req.user.id)
                .then(data => res.json(data[0]))
                .catch(err => res.status(500).json(err));
        } else {
            return -1;
        }
    }

    editProfile = (req: Request, res: Response) => {
        console.log(req.body);
        if (req.user) {
            return this.userService.editProfile(req.user.id, req.body)
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err));
        } else {
            return -1;
        }
    }
}