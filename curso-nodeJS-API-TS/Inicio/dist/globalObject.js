"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start_1 = require("./learn-module/start");
console.log(`Running in ${process.cwd()}`);
process.on('exit', () => {
    console.log('the script will is to end');
});
// function teste(a : number){
//     return a ** a;
// }
// console.log(teste(5));
//console.log(process.argv)
// --save deve guardar as dependencias no package.json 
// a referência não precisa necessariamente ser um arquivo pode também ser uma pasta com um arquivo index
// ou também uma pasta com um arquivo package.json apontando para qual arquivo carregar
console.log(start_1.func());
