const { resolve } = require("path");

function gerarNumeros(min, max, tempo = 2000) {

    if (min > max) {

        [max, min] = [min, max]; // trocando os valores do máximo com o minímo

    }

    return new Promise((resolve) => {

        const numeroaleatorio = parseInt(Math.random() * (max - min + 1)) + min;

        setTimeout(() => {

            resolve(numeroaleatorio)

        }, tempo);



    });

}


function gerarVariosNumeros() {
    return Promise.all([
        gerarNumeros(1, 60, 4000),
        gerarNumeros(1, 60, 1000),
        gerarNumeros(1, 60, 2000),
        gerarNumeros(1, 60, 2000),
        gerarNumeros(1, 60, 3000)
    ])

}


console.time('promise'); //início do cronômetro
gerarVariosNumeros()
    .then(console.log)
    .then(()=>{
        console.timeEnd('promise'); // tempo de execução
    });
