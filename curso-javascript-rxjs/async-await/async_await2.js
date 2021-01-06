function gerarNumeros(min, max, numerosProibidos) {

    if (min > max) {

        [max, min] = [min, max]; // trocando os valores do máximo com o minímo

    }

    return new Promise((resolve,reject) => {

        const numeroaleatorio = parseInt(Math.random() * (max - min + 1)) + min;
        
        if(numerosProibidos.includes(numeroaleatorio))
            reject('Número repetido');

        else    
            resolve(numeroaleatorio)


    });

}

// gerarNumeros(1,5,[1,2,4])
// .then(console.log,console.log);

async function gerarMegaSena(qtdenumeros){

    const numeros = [];
    for (let _ of Array(qtdenumeros).fill()){
        numeros.push(await gerarNumeros(1,60,numeros))
    }

    return numeros;
}

gerarMegaSena(6).then(console.log,console.log);

