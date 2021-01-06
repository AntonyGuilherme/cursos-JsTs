function composition(...fns){

    return function (valor){

        return fns.reduce((acc , fn) => fn(acc) ,valor ); //executando todas as function passando o retorno de uma a próxima

    }

}

const gritar = (text) => text.toUpperCase() ;
const enfatizar = (text) => `${text}!!!`;
const separar = (text) => text.split('').join('/');
const exagerado = composition(gritar,enfatizar,separar);

console.log(exagerado('PARA'));
console.log(exagerado('STOP'));
console.log(exagerado('fire in the hole'));