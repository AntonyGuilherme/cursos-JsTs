"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const yargs = require("yargs");
const argv = yargs.alias('f', 'filename').alias('c', 'content').demandOption('filename').demandOption('content').argv;
const { content, filename } = argv;
fs.writeFile(filename + '.txt', content, (error) => {
    if (error)
        throw error;
    console.log(`The file ${filename} was saved succefully`);
});
