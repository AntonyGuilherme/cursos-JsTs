import { restaurantsRouter } from './restaurants/restaurants.router';
import { reviewsRouter } from './reviews/reviews.router';
import { Server } from './server/server';
import { usersRouter } from './users/users.router';

const server = new Server();

server.bootstrap([usersRouter, restaurantsRouter,reviewsRouter])
    .then((server) => console.log(`API  IS RUNNING ON htpp://localhost`))
    .catch(error => {
        console.log('Server failed to start');
        console.log(error);
        process.exit(1);
    })