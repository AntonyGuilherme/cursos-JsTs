
//Funções que operam em outras funções tomando-as como argumentos
// ou retornando-as, são chamadas de higher-order functions.

function exec(fn , ...params){

 return (texto) => ` ${texto} ${fn(...params)} ` ;

}

function somar (a , b , c){
    return a+b+c;
}

function mult(a,b){

    return a*b;

}

const r1 = exec(somar,4,5,6)('Soma');
const r2 = exec(mult,3,5)('Mult');

console.log(r1,r2);