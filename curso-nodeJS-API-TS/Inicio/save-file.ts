import * as fs from 'fs';
import * as yargs from 'yargs';

const argv = yargs.alias('f','filename').alias('c','content').demandOption('filename').demandOption('content').argv ;
const {content , filename} : {content : string | any , filename : string | any} = argv;
fs.writeFile(filename + '.txt', content , (error) => {
    if(error) throw error;
    console.log(`The file ${filename} was saved succefully`)
})