import { environment } from "./common/environment";
import { Review } from "./reviews/reviews.model";
import { reviewsRouter } from "./reviews/reviews.router";
import { Server } from "./server/server";
import { User } from "./users/users.model";
import { usersRouter } from "./users/users.router";
import * as jestCli from 'jest-cli';
import { restaurantsRouter } from "./restaurants/restaurants.router";

let server : Server ;
let URL_TEST : string = '';
const beforeAllTests = async () => {
    environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db';
    environment.server.port = process.env.SERVER_PORT || 3001;
    URL_TEST = `http://localhost:${environment.server.port}`;
    server = new Server();
    return server.bootstrap([usersRouter , reviewsRouter , restaurantsRouter ])
        .then(() => User.deleteMany({}).exec())
        .then(() => Review.deleteMany({}).exec())
        .catch(console.error)
}

const afterAllTests = async () => {
    return server.shutdown();
}

beforeAllTests()
.then(() => jestCli.run() )
.then(() => afterAllTests())
.catch(console.error)

