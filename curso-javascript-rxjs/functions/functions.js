//Function declaration 

function bomdia() {

    console.log('Bom dia');

}


bomdia();


//Function Expression
const boatarde = function () {
    console.log('Boa tarde');
}

boatarde();

//Passar functions como parâmetros e retorná-la
function teste(Func, param1, param2) {
    return Func(param1, param2);
}

console.log(teste((param1, param2) => param2 - param1, 4, 8));

//! --------------------------------------------------------------

// ? Passar parâmetros de maneira gradual 
function potencia(base) {

    return function (exp) {
        return Math.pow(base, exp);
    }

}

const pot = potencia(4);
console.log(pot(2));

console.log(potencia(4)(2))


const somar = (num1) => (num2) => (num3) => num1 + num2 + num3;

console.log(somar(2)(2)(2)); // retorno 6

const calcular = (num1) => (num2) => (func) => func(num1, num2);

console.log(calcular(4)(3)((num1, num2) => num1 ** num2)); //retorno 64

//! -------------------------------------------------------------


const _somar = (...numeros) => {

    let total = 0;

    for(let n of numeros)
        total+=n;

    return total ;    
}

console.log(_somar(1,2,3,4,5,6,7,8,9))

Array.prototype.log = function(){ //! Não pode ser uma arrow
    console.log(this) //? o array que está sendo acessado
}

const nums= [1,2,3,4,4];
nums.log()