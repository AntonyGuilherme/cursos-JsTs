"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRouter = void 0;
const router_1 = require("./router");
const mongoose = require("mongoose");
const restify_errors_1 = require("restify-errors");
class ModelRouter extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.validateId = (request, response, next) => {
            if (!mongoose.isValidObjectId(request.params._id)) {
                next(new restify_errors_1.NotFoundError('Document not founded!'));
            }
            else {
                next();
            }
        };
        this.findAll = (request, response, next) => {
            this.model.find()
                .then(this.renderAll(response, next))
                .catch(next);
        };
        this.findById = (request, response, next) => {
            this.model.findById(request.params._id)
                .then(this.render(response, next))
                .catch(next);
        };
        this.save = (request, response, next) => {
            const document = new this.model(request.body);
            document.save()
                .then(this.render(response, next))
                .catch(next);
        };
        this.replaceOne = (request, response, next) => {
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
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado!');
                }
            })
                .then(this.render(response, next))
                .catch(next);
        };
        this.update = (request, response, next) => {
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
                .catch(next);
        };
        this.delete = (request, response, next) => {
            const { _id } = request.params;
            this.model.deleteOne({ _id }).exec()
                .then(cmdResult => {
                if (cmdResult.n) {
                    response.send(204);
                }
                else {
                    response.send(404);
                }
                return next();
            })
                .catch(next);
        };
    }
}
exports.ModelRouter = ModelRouter;
