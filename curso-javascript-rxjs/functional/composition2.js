function composition(...fns) {

    return function (valor) {

        return fns.reduce(async (acc, fn) => {


            if (Promise.resolve(acc) === acc) //checando se a função é uma promise
                return fn(await acc);
            else {
                return fn(acc);
            }

        }, valor); //executando todas as function passando o retorno de uma a próxima

    }

}


const gritar = (text) => text.toUpperCase();
const enfatizar = (text) => `${text}!!!`;
const separar = (text) => text.split('').join('/');
const lento = (text) => new Promise((resolve) => setTimeout(() => resolve(text.split('').join(' ')), 3000)) ;
const exagerado = composition(gritar, enfatizar, separar,lento);

exagerado('PARA').then(console.log);
exagerado('STOP').then(console.log);
exagerado('fire in the hole').then(console.log);