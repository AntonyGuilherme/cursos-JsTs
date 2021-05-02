"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const restify_errors_1 = require("restify-errors");
exports.authorize = (...profiles) => {
    return (request, response, next) => {
        if (request.authenticated != undefined && request.authenticated.hasAny(...profiles)) {
            next();
        }
        else {
            next(new restify_errors_1.ForbiddenError('Permission denied!'));
        }
    };
};
