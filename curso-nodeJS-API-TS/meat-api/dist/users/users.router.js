"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRouter(application) {
        application.get('/users', this.findAll);
        application.get('/users/:_id', this.validateId, this.findById);
        application.post('/users', this.save);
        application.put('/users/:_id', this.validateId, this.replaceOne);
        application.patch('/users/:_id', this.validateId, this.update);
        application.del('/users/:_id', this.validateId, this.delete);
    }
}
exports.usersRouter = new UsersRouter();
