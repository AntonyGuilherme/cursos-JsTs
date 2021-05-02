import * as restify from "restify";
import * as jwt from 'jsonwebtoken';
import {User} from '../users/users.model';
import { environment } from "../common/environment";
import { restifyCallBack } from "../common/model-router";

export const tokenParser: restify.RequestHandler = (request,response,next) => {


    const token = extractToken(request);
    if(token){
        jwt.verify(token,environment.security.apiSecret, applyBearer(request,next));
    }else{
        next()
    }
}

function extractToken(request : restify.Request){

    //Authorization: Bearer TOKEN
    const authorization = request.header('Authorization');
    if(authorization && typeof authorization == 'string'){
        const parts:string[] = authorization.split(' ');
        if(parts.length == 2 && parts[0] === 'Bearer'){
            return parts[1];
        }
    }

    return undefined;

}


function applyBearer(request : restify.Request , next : restify.Next) : (error,decoded) => void{

    return (error,decoded) => {
        if(decoded){

            User.findByEmail(decoded.sub).then(user => {

                if(user){
                    //associar o usuário ao request
                    request.authenticated = user;
                }

                next()

            })
            .catch(next);

        }else{
            next();
        }
    }



}