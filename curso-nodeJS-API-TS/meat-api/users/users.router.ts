import { Server } from 'restify';
import { ModelRouter, restifyCallBack } from '../common/model-router';
import { authenticate } from '../security/auth.handler';
import { authorize } from '../security/authz.handler';
import { User } from './users.model';


class UsersRouter extends ModelRouter<User> {

    constructor() {
        super(User);
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }

    findByEmail: restifyCallBack = (request, response, next) => {

        if (request.query.email) {
            User.findByEmail(request.query.email)
                .then(user => user ?  [user] : [])
                .then(this.renderAll(response, next , { pageSize : this.pageSize , url : request.url }))
                .catch(next);
        } else {
            next();
        }

    }

    applyRouter(application: Server) {

        // * controle de versão  * Header Accept version * accept-version
        application.get({ path: `${this.basePath}`, version: '2.0.0' }, authorize('admin') ,this.findByEmail, this.findAll);
        application.get({ path: `${this.basePath}`, version: '1.0.0' },  authorize('admin') , this.findAll);


        application.get(`${this.basePath}/:_id`,  authorize('admin') , this.validateId, this.findById);
        application.post(`${this.basePath}`,  authorize('admin') , this.save);
        application.put(`${this.basePath}/:_id`,  authorize('admin') , this.validateId, this.replaceOne);
        application.patch(`${this.basePath}/:_id`,  authorize('admin') , this.validateId, this.update);
        application.del(`${this.basePath}/:_id`,  authorize('admin') , this.validateId, this.delete);
        application.post(`${this.basePath}/authenticate`,authenticate);

        return super.applyRouter(application);
    }

}


export const usersRouter = new UsersRouter();