import * as resitfy from "restify";
import * as jwt from 'jsonwebtoken';
import { NotAuthorizedError } from "restify-errors";
import {User} from '../users/users.model';
import { environment } from "../common/environment";
export const authenticate : resitfy.RequestHandler  = (request,response,next) => {

    // email e password
    const {email , password} = request.body;
    User.findByEmail(email,'+password') 
    .then(user => {
        if(user && user.matches(password)){
            /*
            gerar o token
            JWT JSON WEB TOKEN
            Header { alg : "HS256" , typ: "JWT" } - informações sobre o token 
            Body { sub : "user@host.com" , "iss": "my-token-manager" , exp : "1503183549"  }
            */

            const token = jwt.sign({sub : user.email , iss : 'meat-api' } , environment.security.apiSecret);
            response.json({name:user.name,email:user.email,accessToken:token});
            return next(false);


        }else{
            return next(new NotAuthorizedError('Invalid Credentials'));
        }
    }).catch(next)



}