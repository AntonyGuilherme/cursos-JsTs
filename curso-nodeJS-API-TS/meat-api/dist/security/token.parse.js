"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenParser = void 0;
const jwt = require("jsonwebtoken");
const users_model_1 = require("../users/users.model");
const environment_1 = require("../common/environment");
exports.tokenParser = (request, response, next) => {
    const token = extractToken(request);
    if (token) {
        jwt.verify(token, environment_1.environment.security.apiSecret, applyBearer(request, next));
    }
    else {
        next();
    }
};
function extractToken(request) {
    //Authorization: Bearer TOKEN
    const authorization = request.header('Authorization');
    if (authorization && typeof authorization == 'string') {
        const parts = authorization.split(' ');
        if (parts.length == 2 && parts[0] === 'Bearer') {
            return parts[1];
        }
    }
    return undefined;
}
function applyBearer(request, next) {
    return (error, decoded) => {
        if (decoded) {
            users_model_1.User.findByEmail(decoded.sub).then(user => {
                if (user) {
                    //associar o usuário ao request
                    request.authenticated = user;
                }
                next();
            })
                .catch(next);
        }
        else {
            next();
        }
    };
}
