"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const model_router_1 = require("../common/model-router");
const auth_handler_1 = require("../security/auth.handler");
const authz_handler_1 = require("../security/authz.handler");
const users_model_1 = require("./users.model");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.findByEmail = (request, response, next) => {
            if (request.query.email) {
                users_model_1.User.findByEmail(request.query.email)
                    .then(user => user ? [user] : [])
                    .then(this.renderAll(response, next, { pageSize: this.pageSize, url: request.url }))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRouter(application) {
        // * controle de versão  * Header Accept version * accept-version
        application.get({ path: `${this.basePath}`, version: '2.0.0' }, authz_handler_1.authorize('admin'), this.findByEmail, this.findAll);
        application.get({ path: `${this.basePath}`, version: '1.0.0' }, authz_handler_1.authorize('admin'), this.findAll);
        application.get(`${this.basePath}/:_id`, authz_handler_1.authorize('admin'), this.validateId, this.findById);
        application.post(`${this.basePath}`, authz_handler_1.authorize('admin'), this.save);
        application.put(`${this.basePath}/:_id`, authz_handler_1.authorize('admin'), this.validateId, this.replaceOne);
        application.patch(`${this.basePath}/:_id`, authz_handler_1.authorize('admin'), this.validateId, this.update);
        application.del(`${this.basePath}/:_id`, authz_handler_1.authorize('admin'), this.validateId, this.delete);
        application.post(`${this.basePath}/authenticate`, auth_handler_1.authenticate);
        return super.applyRouter(application);
    }
}
exports.usersRouter = new UsersRouter();
