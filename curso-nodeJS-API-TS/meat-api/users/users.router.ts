import { Server } from 'restify';
import { ModelRouter } from '../common/model-router';
import { User } from './users.model';


class UsersRouter extends ModelRouter<User> {

    constructor() {
        super(User);
        this.on('beforeRender', document => {
                document.password = undefined;
        });
    }

    applyRouter(application: Server) {

        application.get('/users', this.findAll);
        application.get('/users/:_id', this.validateId , this.findById);
        application.post('/users', this.save);
        application.put('/users/:_id', this.validateId , this.replaceOne);
        application.patch('/users/:_id',this.validateId , this.update);
        application.del('/users/:_id', this.validateId , this.delete);

    }

}


export const usersRouter = new UsersRouter();