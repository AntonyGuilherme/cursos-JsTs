import * as mongoose from 'mongoose';
import * as restify from 'restify';
import { ModelRouter } from '../common/model-router';
import { authorize } from '../security/authz.handler';
import { Review } from './reviews.model';

class ReviewsRouter extends ModelRouter<Review>{

  constructor() {
    super(Review);
  }

  // findById: restifyCallBack = (request, response, next) => {
  //   this.model.findById(request.params._id)
  //     .populate('user', ['name', 'email'])
  //     .populate('restaurant')
  //     .then(this.render(response, next))
  //     .catch(next)
  // }

  protected perpareOne(query: mongoose.DocumentQuery<Review, Review>): mongoose.DocumentQuery<Review, Review> {
    return query.populate('user', ['name', 'email']).populate('restaurant');
  }

  envelope(document: any) {
    const resource = super.envelope(document);
    const restId = resource.restaurant._id ?? resource.restaurant;
    resource._links.restaurant = `/restaurants/${restId}`;
    return resource;
  }


  applyRouter(application: restify.Server) {

    application.get('/reviews', this.findAll);
    application.get('/reviews/:_id', this.validateId, this.findById);
    application.post('/reviews', authorize('user'), this.save);
    return super.applyRouter(application);
  }

}


export const reviewsRouter = new ReviewsRouter();
