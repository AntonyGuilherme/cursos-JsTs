
function soma(a,b,c){
    return a + b + c;
}

console.log(soma(1,2,3));

const somaCurrying = (a) => (b) => (c) => a+b+c; 
console.log(somaCurrying(1)(2)(3));


function textWithLengthBetween(min,max,erro,text){

    const length = (text || '') . trim().length ; // similar a ??
   
    if(length < min || length > max){
        throw erro;
    }

    return length ;

}

const textWithLengthBetweenCurrying = (min) => (max) => (error) => (text) =>{

    const length = (text || '') . trim().length ; // similar a ??
   
    if(length < min || length > max){
        throw erro;
    }
}


console.log(textWithLengthBetween(1,2,'error','teste'));

textWithLengthBetweenCurrying(1)(2)('error')('teste');

const p1 = { nome : 'A' , preco : 14.99 , desc: 0.25};


const standard = textWithLengthBetweenCurrying(1)(2);
const standard2 = standard('Error','Nome') ; 
const standard2 = standard('Error','NomeDois') ; 


const validation = (func) => (valor) => {

    //Lazy Evaluation

    if(func(valor)){
        return valor
    }
    else

    {
        return null ;
    }

}

