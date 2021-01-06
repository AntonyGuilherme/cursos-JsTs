/**
 * * Uma função pura é uma função em que o valor de retorno
 * * é determinado APENAS por seus valores de entrada, sem
 * * efeitos colaterais observáveis
 * */

 const PI = 3.14 ;
 

 // * Impura , pois o retorno depende diretamente de valores externos 'PI'.

 function AreaCircle(raio){

    return (raio ** 2) * PI ;

}

console.log(AreaCircle(4));


//* Pura

function AreaCirclePura(raio,pi){

    return (raio **  2) * pi ;

}

console.log(AreaCirclePura(4,Math.PI));