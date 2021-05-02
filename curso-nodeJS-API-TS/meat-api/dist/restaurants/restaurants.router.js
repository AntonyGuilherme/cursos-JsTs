"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantsRouter = void 0;
const restify_errors_1 = require("restify-errors");
const model_router_1 = require("../common/model-router");
const authz_handler_1 = require("../security/authz.handler");
const restaurants_model_1 = require("./restaurants.model");
class RestaurantsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(restaurants_model_1.Restaurant);
        this.findMenu = (request, response, next) => {
            restaurants_model_1.Restaurant.findById(request.params._id, "+menu")
                .then(rest => {
                if (!rest) {
                    next(new restify_errors_1.NotFoundError('Restaurant not founded'));
                }
                else {
                    response.json(rest.menu);
                    return next();
                }
            })
                .catch(next);
        };
        this.replaceMenu = (request, response, next) => {
            restaurants_model_1.Restaurant.findById(request.params._id, "+menu")
                .then(rest => {
                if (!rest) {
                    next(new restify_errors_1.NotFoundError('Restaurant not founded'));
                }
                else {
                    rest.menu = request.body; // array menuItens
                    return rest.save();
                }
            })
                .then(rest => {
                response.json(rest);
            })
                .catch(next);
        };
    }
    envelope(document) {
        const resource = super.envelope(document);
        resource._links.menu = `${resource._links.self}/menu`;
        return resource;
    }
    applyRouter(application) {
        application.get('/restaurants', this.findAll);
        application.get('/restaurants/:_id', this.validateId, this.findById);
        application.post('/restaurants', authz_handler_1.authorize('admin'), this.save);
        application.put('/restaurants/:_id', authz_handler_1.authorize('admin'), this.validateId, this.replaceOne);
        application.patch('/restaurants/:_id', authz_handler_1.authorize('admin'), this.validateId, this.update);
        application.del('/restaurants/:_id', authz_handler_1.authorize('admin'), this.validateId, this.delete);
        application.get('/restaurants/:_id/menu', this.validateId, this.findMenu);
        application.put('/restaurants/:_id/menu', authz_handler_1.authorize('admin'), this.validateId, this.replaceMenu);
        return super.applyRouter(application);
    }
}
exports.restaurantsRouter = new RestaurantsRouter();
