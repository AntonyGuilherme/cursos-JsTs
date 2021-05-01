import { Router } from './router';
import * as mongoose from 'mongoose';
import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';


interface restifyCallBack {
    (request: restify.Request, response: restify.Response, next: restify.Next): void
}

export abstract class ModelRouter<T extends mongoose.Document> extends Router {


    constructor(protected model: mongoose.Model<T>) {
        super();
    }

    validateId : restifyCallBack = (request,response,next) => {
        if(!mongoose.isValidObjectId(request.params._id)){
            next(new NotFoundError('Document not founded!'))
        }
        else{
            next();
        }
    }

    findAll: restifyCallBack = (request, response, next) => {
        this.model.find()
            .then(this.renderAll(response, next))
            .catch(next);
    }

    findById: restifyCallBack = (request, response, next) => {
        this.model.findById(request.params._id)
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
            .then(user => {
                if (user.nModified) {
                    response.json({ message: 'Alteração realizada com sucesso' });
                    return next();
                }
                response.send(404);
                return next();
            })
            .catch(next)
    }

    delete : restifyCallBack = (request, response, next) => {

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