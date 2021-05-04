"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const bunyan = require("bunyan");
const environment_1 = require("./environment");
exports.logger = bunyan.createLogger({
    name: environment_1.environment.log.name,
    level: bunyan.resolveLevel(environment_1.environment.log.level)
});
