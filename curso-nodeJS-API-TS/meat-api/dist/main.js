"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurants_router_1 = require("./restaurants/restaurants.router");
const reviews_router_1 = require("./reviews/reviews.router");
const server_1 = require("./server/server");
const users_router_1 = require("./users/users.router");
const server = new server_1.Server();
server.bootstrap([users_router_1.usersRouter, restaurants_router_1.restaurantsRouter, reviews_router_1.reviewsRouter])
    .then((server) => console.log(`API  IS RUNNING ON htpp://localhost`))
    .catch(error => {
    console.log('Server failed to start');
    console.log(error);
    process.exit(1);
});
