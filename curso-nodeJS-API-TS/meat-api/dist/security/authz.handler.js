"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const restify_errors_1 = require("restify-errors");
exports.authorize = (...profiles) => {
    return (request, response, next) => {
        if (request.authenticated != undefined && request.authenticated.hasAny(...profiles)) {
            request.log.debug('User %s is authorized with profiles %j on route %s. Required profiles %j.', request.authenticated._id, request.authenticated.profiles, request.path(), profiles);
            next();
        }
        else {
            if (request.authenticated) {
                request.log.debug('Permission Denied for %s. Required profiles: %j. User profiles: %j', request.authenticated._id, profiles, request.authenticated.profiles);
            }
            next(new restify_errors_1.ForbiddenError('Permission denied!'));
        }
    };
};
