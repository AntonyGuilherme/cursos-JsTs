"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRouter = void 0;
const model_router_1 = require("../common/model-router");
const authz_handler_1 = require("../security/authz.handler");
const reviews_model_1 = require("./reviews.model");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
    }
    // findById: restifyCallBack = (request, response, next) => {
    //   this.model.findById(request.params._id)
    //     .populate('user', ['name', 'email'])
    //     .populate('restaurant')
    //     .then(this.render(response, next))
    //     .catch(next)
    // }
    perpareOne(query) {
        return query.populate('user', ['name', 'email']).populate('restaurant');
    }
    envelope(document) {
        var _a;
        const resource = super.envelope(document);
        const restId = (_a = resource.restaurant._id) !== null && _a !== void 0 ? _a : resource.restaurant;
        resource._links.restaurant = `/restaurants/${restId}`;
        return resource;
    }
    applyRouter(application) {
        application.get('/reviews', this.findAll);
        application.get('/reviews/:_id', this.validateId, this.findById);
        application.post('/reviews', authz_handler_1.authorize('user'), this.save);
        return super.applyRouter(application);
    }
}
exports.reviewsRouter = new ReviewsRouter();
