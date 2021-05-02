import * as restify from 'restify';
import { BadRequestError } from 'restify-errors';

const mpContentType = "application/merge-patch+json";
export const mergePatchBodyParser = (request: restify.Request, response: restify.Response, next: restify.Next) => {

  if (request.getContentType() === mpContentType && request.method === "PATCH") {

    try {
      request.body = JSON.parse(request.body);
    } catch (error) {
      next(new BadRequestError(`Invalid content: ${error.message}`));
    }
  }

  return next();


}
