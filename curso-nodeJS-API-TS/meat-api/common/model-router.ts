import { Router } from './router';
import * as mongoose from 'mongoose';
import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';


export interface restifyCallBack {
    (request: restify.Request, response: restify.Response, next: restify.Next): void
}

export abstract class ModelRouter<T extends mongoose.Document> extends Router {

    basePath: string;
    pageSize: number = 4;

    constructor(protected model: mongoose.Model<T>) {
        super();
        this.basePath = `/${this.model.collection.name}`

    }

    protected perpareOne(query: mongoose.DocumentQuery<T, T>): mongoose.DocumentQuery<T, T> {
        return query;
    }

    envelope(document: any): any {
        const resource = Object.assign({ _links: {} }, document.toJSON());
        resource._links.self = `${this.basePath}/${resource._id}`

        return resource;
    }

    envelopeAll(documents: any[], options: any = {}): any {
        const resources: any = {
            _links: { self: `` },
            items: documents
        }

        if (options.page && options.count && options.pageSize) {
            if (options.page > 1) {
                resources._links.previous = `${this.basePath}?_page=${options.page - 1}`;
            }
            const remaining = options.count - (options.page * options.pageSize);
            if (remaining > 0) {
                resources._links.next = `${this.basePath}?_page=${options.page + 1}`;
            }
        }

        return resources;
    }

    applyRouter(application: restify.Server) {
        return this.basePath;
    }


    validateId: restifyCallBack = (request, response, next) => {
        if (!mongoose.isValidObjectId(request.params._id)) {
            next(new NotFoundError('Document not founded!'))
        }
        else {
            next();
        }
    }

    findAll: restifyCallBack = (request, response, next) => {

        let page = parseInt(request.query._page || 1);
        page = page > 0 ? page : 1;
        const skip = (page - 1) * this.pageSize;

        this.model.countDocuments({}).exec()
            .then(count => this.model.find().limit(this.pageSize)
                .skip(skip)
                .then(this.renderAll(response, next, { page, count, pageSize: this.pageSize, url: request.url })))
            .catch(next);
    }

    findById: restifyCallBack = (request, response, next) => {
        this.perpareOne(this.model.findById(request.params._id))
            .then(this.render(response, next))
            .catch(next)
    }

    save: restifyCallBack = (request, response, next) => {

        const document = new this.model(request.body);

        document.save()
            .then(this.render(response, next))
            .catch(next)

    }

    replaceOne: restifyCallBack = (request, response, next) => {
        const { _id } = request.params;

        if (!mongoose.isValidObjectId(_id)) {

            response.statusCode = 400;
            response.json({ message: 'Invailid ID' });
            return next();
        }

        this.model.replaceOne({ _id }, request.body, { runValidators: true }).exec()
            .then(result => {
                if (result.n) {
                    return this.model.findById(_id);
                } else {
                    throw new NotFoundError('Documento não encontrado!');
                }

            })
            .then(this.render(response, next))
            .catch(next)

    }


    update: restifyCallBack = (request, response, next) => {

        if (!mongoose.isValidObjectId(request.params._id)) {

            response.statusCode = 400;
            response.json({ message: 'Invailid ID' });
            return next();
        }

        this.model.updateOne({ _id: request.params._id }, request.body, { runValidators: true })
            .then(update => {
                if (update.nModified) {
                    this.model.findById(request.params._id)
                    .then(user => {
                        response.json(user);
                        return next();
                    })
                    .catch(error => {
                        response.send(204);
                        return next();
                    })
                }else{
                    response.send(404);
                    return next();
                }
            })
            .catch(next)
    }

    delete: restifyCallBack = (request, response, next) => {

        const { _id } = request.params;
        this.model.deleteOne({ _id }).exec()
            .then(cmdResult => {
                if (cmdResult.n) {
                    response.send(204);
                } else {
                    response.send(404);
                }
                return next();
            })
            .catch(next)


    }

}