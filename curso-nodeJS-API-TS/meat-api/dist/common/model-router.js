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
        this.pageSize = 4;
        this.validateId = (request, response, next) => {
            if (!mongoose.isValidObjectId(request.params._id)) {
                next(new restify_errors_1.NotFoundError('Document not founded!'));
            }
            else {
                next();
            }
        };
        this.findAll = (request, response, next) => {
            let page = parseInt(request.query._page || 1);
            page = page > 0 ? page : 1;
            const skip = (page - 1) * this.pageSize;
            this.model.countDocuments({}).exec()
                .then(count => this.model.find().limit(this.pageSize)
                .skip(skip)
                .then(this.renderAll(response, next, { page, count, pageSize: this.pageSize, url: request.url })))
                .catch(next);
        };
        this.findById = (request, response, next) => {
            this.perpareOne(this.model.findById(request.params._id))
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
                    });
                }
                else {
                    response.send(404);
                    return next();
                }
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
        this.basePath = `/${this.model.collection.name}`;
    }
    perpareOne(query) {
        return query;
    }
    envelope(document) {
        const resource = Object.assign({ _links: {} }, document.toJSON());
        resource._links.self = `${this.basePath}/${resource._id}`;
        return resource;
    }
    envelopeAll(documents, options = {}) {
        const resources = {
            _links: { self: `` },
            items: documents
        };
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
    applyRouter(application) {
        return this.basePath;
    }
}
exports.ModelRouter = ModelRouter;
