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
class Server {
    initializeDb() {
        return mongoose.connect(environment_1.environment.db.url, { useFindAndModify: true });
    }
    initRoutes(routers) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    this.application = restify.createServer({
                        name: 'meat-api',
                        version: '1.0.0'
                    });
                    // antes das rotas
                    this.application.use(restify.plugins.queryParser());
                    this.application.use(restify.plugins.bodyParser());
                    this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                    //routes
                    for (const router of routers) {
                        router.applyRouter(this.application);
                    }
                    this.application.listen(environment_1.environment.server.port, () => resolve(this.application));
                    this.application.on('restifyError', error_handler_1.handleError);
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
}
exports.Server = Server;
