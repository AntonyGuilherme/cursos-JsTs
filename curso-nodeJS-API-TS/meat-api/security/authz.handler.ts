import * as restify from "restify";
import { ForbiddenError } from "restify-errors";

export const authorize: (...profiles: string[]) => restify.RequestHandler = (...profiles: string[]) => {

    return (request, response, next) => {

        if (request.authenticated != undefined && request.authenticated.hasAny(...profiles)) {
            request.log.debug('User %s is authorized with profiles %j on route %s. Required profiles %j.',
                request.authenticated._id,request.authenticated.profiles,request.path(),profiles)
            next();
        }
        else {
            if(request.authenticated){
                request.log.debug('Permission Denied for %s. Required profiles: %j. User profiles: %j',
                request.authenticated._id,profiles,request.authenticated.profiles)
            }
            next(new ForbiddenError('Permission denied!'));
        }

    }


}
