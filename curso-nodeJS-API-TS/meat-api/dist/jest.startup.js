"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./common/environment");
const reviews_model_1 = require("./reviews/reviews.model");
const reviews_router_1 = require("./reviews/reviews.router");
const server_1 = require("./server/server");
const users_model_1 = require("./users/users.model");
const users_router_1 = require("./users/users.router");
const jestCli = require("jest-cli");
const restaurants_router_1 = require("./restaurants/restaurants.router");
let server;
let URL_TEST = '';
const beforeAllTests = () => __awaiter(void 0, void 0, void 0, function* () {
    environment_1.environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db';
    environment_1.environment.server.port = process.env.SERVER_PORT || 3001;
    URL_TEST = `http://localhost:${environment_1.environment.server.port}`;
    server = new server_1.Server();
    return server.bootstrap([users_router_1.usersRouter, reviews_router_1.reviewsRouter, restaurants_router_1.restaurantsRouter])
        .then(() => users_model_1.User.deleteMany({}).exec())
        .then(() => {
        let admin = new users_model_1.User();
        admin.name = "admin";
        admin.email = "admin@email.com";
        admin.password = '123456';
        admin.profiles = ['user', 'admin'];
        let adminNoPermission = new users_model_1.User();
        adminNoPermission.name = "admin";
        adminNoPermission.email = "adminPermission@email.com";
        adminNoPermission.password = '123456';
        adminNoPermission.profiles = [];
        return Promise.all([admin.save(), adminNoPermission.save()]);
    })
        .then(() => reviews_model_1.Review.deleteMany({}).exec())
        .catch(console.error);
});
const afterAllTests = () => __awaiter(void 0, void 0, void 0, function* () {
    return server.shutdown();
});
beforeAllTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error);
