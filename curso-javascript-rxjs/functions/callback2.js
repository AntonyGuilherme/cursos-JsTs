
const fs = require('fs');
const path = require('path');
const caminho = path.join(__dirname,'teste.txt');
console.log('Caminho do Arquivo',caminho);

function exibir(err , dados) {

    console.log(dados.toString().length,err)


}

fs.readFile(caminho,{} ,exibir); //* Equivalente a isto fs.readFile(caminho ,exibir);

//! De maneira sincrona

console.log('init');
const conteudo = fs.readFileSync(caminho);
console.log(conteudo.toString());
console.log('end');

