function gerarNumeros(min, max) {

    if (min > max) {

        [max, min] = [min, max]; // trocando os valores do máximo com o minímo

    }

    return new Promise((resolve) => {

        const numeroaleatorio = parseInt(Math.random() * (max - min + 1)) + min;
        resolve(numeroaleatorio)


    });

}


gerarNumeros(1, 2).then(console.log);





const fs = require('fs');
const path = require('path');

function getFile(pathFile) {

    const caminho = path.join(__dirname,pathFile);
    
    return new Promise((resolve, reject) => {

        const exibir = (error, dados) => {

            if(!error)
                resolve(dados.toString())
            else
                reject(error)

        }

        fs.readFile(caminho, {}, exibir); 


    });


}


getFile('../functions/teste.txt')
    
    .then(element => element.split('\n')) // separa a string em um array sendo a divisória de um elemento para o outro a quebra de linha
    .then( linhas => linhas.join(',') ) // junta os elementos do array separando-os por vírgula
    .then(console.log)


    .catch(console.log);










