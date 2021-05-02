import { Server } from 'restify';
import { NotFoundError } from 'restify-errors';
import { ModelRouter, restifyCallBack } from '../common/model-router';
import { authorize } from '../security/authz.handler';
import { Restaurant } from './restaurants.model';

class RestaurantsRouter extends ModelRouter<Restaurant>{
    
    constructor(){
        super(Restaurant);
    }
    
    findMenu : restifyCallBack = (request,response,next) => {

        Restaurant.findById(request.params._id,"+menu")
        .then(rest => {
            if(!rest){
                next(new NotFoundError('Restaurant not founded'));
            }else{
                response.json(rest.menu);
                return next();
            }
        })
        .catch(next);

    };

    envelope(document : any){
        const resource = super.envelope(document);
        resource._links.menu = `${resource._links.self}/menu`;
        return resource;
    }

    replaceMenu : restifyCallBack = (request,response,next) => {

        Restaurant.findById(request.params._id,"+menu")
        .then(rest => {
            if(!rest){
                next(new NotFoundError('Restaurant not founded'));
            }else{
                rest.menu = request.body; // array menuItens
                return rest.save();
            }
        })
        .then(rest => {
            response.json(rest);
        })
        .catch(next);

    }

    applyRouter(application: Server) {
       
        application.get('/restaurants',  this.findAll);
        application.get('/restaurants/:_id', this.validateId , this.findById);
        application.post('/restaurants',  authorize('admin') ,this.save);
        application.put('/restaurants/:_id',  authorize('admin') , this.validateId , this.replaceOne);
        application.patch('/restaurants/:_id',  authorize('admin') ,this.validateId , this.update);
        application.del('/restaurants/:_id',  authorize('admin') ,this.validateId , this.delete);

        application.get('/restaurants/:_id/menu',this.validateId , this.findMenu);
        application.put('/restaurants/:_id/menu',  authorize('admin') ,this.validateId , this.replaceMenu)
        return super.applyRouter(application);
    }

}

export const restaurantsRouter = new RestaurantsRouter();