import * as mongoose from 'mongoose';
import * as restify from 'restify';
import { environment } from '../common/environment';
import { Router } from '../common/router';
import { mergePatchBodyParser } from './merge-patch.parser';
import { handleError } from './error.handler';
import { tokenParser } from '../security/token.parse'
import * as fs from 'fs';


export class Server {

    application: restify.Server;

    initializeDb(): Promise<mongoose.Mongoose> {
        return mongoose.connect(environment.db.url, { useFindAndModify: true, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    }

    async initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                const options: restify.ServerOptions = {
                    name:'meat-api',
                    version:'1.0.0'
                }

                if(environment.security.enableHTTPS){
                   options.certificate = fs.readFileSync(environment.security.certificate); 
                   options.key = fs.readFileSync(environment.security.key); 
                }

                this.application = restify.createServer(options);

                // antes das rotas
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(mergePatchBodyParser);
                this.application.use(tokenParser);

                //avaliable routes
                let _links = [];

                //routes
                for (const router of routers) {
                    _links.push(router.applyRouter(this.application));
                }

                this.application.get('/', function (request, response, next) {
                    response.json({ _links });
                    return next();
                })

                this.application.listen(environment.server.port, () => resolve(this.application));
                this.application.on('restifyError', handleError)

            }
            catch (error) {
                reject(error);
            }
        })
    }

    async bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(() =>
            this.initRoutes(routers)).then(() => this)
    }

    async shutdown() {
        return mongoose.disconnect().then(() => this.application.close())
    }

}