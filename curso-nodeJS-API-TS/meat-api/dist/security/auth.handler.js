"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt = require("jsonwebtoken");
const restify_errors_1 = require("restify-errors");
const users_model_1 = require("../users/users.model");
const environment_1 = require("../common/environment");
exports.authenticate = (request, response, next) => {
    // email e password
    const { email, password } = request.body;
    users_model_1.User.findByEmail(email, '+password')
        .then(user => {
        if (user && user.matches(password)) {
            /*
            gerar o token
            JWT JSON WEB TOKEN
            Header { alg : "HS256" , typ: "JWT" } - informações sobre o token
            Body { sub : "user@host.com" , "iss": "my-token-manager" , exp : "1503183549"  }
            */
            const token = jwt.sign({ sub: user.email, iss: 'meat-api' }, environment_1.environment.security.apiSecret);
            response.json({ name: user.name, email: user.email, accessToken: token });
            return next(false);
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('Invalid Credentials'));
        }
    }).catch(next);
};
