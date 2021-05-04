"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const mongoose = require("mongoose");
const restify = require("restify");
const environment_1 = require("../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
const token_parse_1 = require("../security/token.parse");
const fs = require("fs");
const logger_1 = require("../common/logger");
const corsMiddleware = require("restify-cors-middleware");
class Server {
    initializeDb() {
        return mongoose.connect(environment_1.environment.db.url, { useFindAndModify: true, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
    }
    initRoutes(routers) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    const options = {
                        name: 'meat-api',
                        version: '1.0.0',
                        log: logger_1.logger
                    };
                    if (environment_1.environment.security.enableHTTPS) {
                        options.certificate = fs.readFileSync(environment_1.environment.security.certificate);
                        options.key = fs.readFileSync(environment_1.environment.security.key);
                    }
                    this.application = restify.createServer(options);
                    const corsOptions = {
                        preflightMaxAge: 10,
                        origins: ['http://localhost:80'],
                        allowHeaders: ['authorization'],
                        exposeHeaders: ['x-custom-header'] //expor um header para aplicação cliente normalmente personalizado
                    };
                    const cors = corsMiddleware(corsOptions);
                    /*
                     o method pre sempre é chamado quando há uma nova requisição
                    o method use é chamado somente se a rota for válida
                    */
                    //request logger
                    this.application.pre(restify.plugins.requestLogger({ log: logger_1.logger }));
                    this.application.pre(cors.preflight);
                    // antes das rotas
                    this.application.use(cors.actual);
                    this.application.use(restify.plugins.queryParser());
                    this.application.use(restify.plugins.bodyParser());
                    this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                    this.application.use(token_parse_1.tokenParser);
                    //avaliable routes
                    let _links = [];
                    //routes
                    for (const router of routers) {
                        _links.push(router.applyRouter(this.application));
                    }
                    this.application.get('/', function (request, response, next) {
                        response.json({ _links });
                        return next();
                    });
                    this.application.put('/', function (request, response, next) {
                        response.json({ _links });
                        return next();
                    });
                    this.application.listen(environment_1.environment.server.port, () => resolve(this.application));
                    this.application.on('restifyError', error_handler_1.handleError);
                    //(request,response,route,error)
                    /* this.application.on('after',restify.plugins.auditLogger({log : logger , event: 'after' , server: this.application}))
     
                     this.application.on('audit', data => {
                         // dados dos logs
                     })*/
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    bootstrap(routers = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.initializeDb().then(() => this.initRoutes(routers)).then(() => this);
        });
    }
    shutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongoose.disconnect().then(() => this.application.close());
        });
    }
}
exports.Server = Server;
