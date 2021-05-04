"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.func = void 0;
const yargs = require("yargs");
const argv = yargs.demandOption('num').argv;
const num = argv.num;
exports.func = () => {
    return Math.pow(num, num);
};
