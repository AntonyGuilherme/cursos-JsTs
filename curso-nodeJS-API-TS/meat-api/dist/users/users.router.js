"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const model_router_1 = require("../common/model-router");
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
        application.get({ path: `${this.basePath}`, version: '2.0.0' }, this.findByEmail, this.findAll);
        application.get({ path: `${this.basePath}`, version: '1.0.0' }, this.findAll);
        application.get(`${this.basePath}/:_id`, this.validateId, this.findById);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:_id`, this.validateId, this.replaceOne);
        application.patch(`${this.basePath}/:_id`, this.validateId, this.update);
        application.del(`${this.basePath}/:_id`, this.validateId, this.delete);
        return super.applyRouter(application);
    }
}
exports.usersRouter = new UsersRouter();
