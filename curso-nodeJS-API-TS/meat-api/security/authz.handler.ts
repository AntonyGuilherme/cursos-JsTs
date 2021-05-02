import * as restify from "restify";
import { ForbiddenError } from "restify-errors";

export const authorize: (...profiles: string[]) => restify.RequestHandler = (...profiles: string[]) => {

    return (request, response, next) => {

        if (request.authenticated != undefined && request.authenticated.hasAny(...profiles)) {
            next();
        }
        else {
            next(new ForbiddenError('Permission denied!'));
        }

    }


}
