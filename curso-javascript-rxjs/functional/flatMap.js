const letrasAninhadas = [['H','e','l',['l'],['o']],[' '],['W','o','r','l','d']];

const letras = letrasAninhadas.flat(Infinity);


const resultado = letras.flatMap(el => [el , ',']).reduce((a,b) => a+b);
console.log(resultado);


/*
array.flat() - [[]] => []
array.flat(2) - [[[]]] => []
.....

quando não se sabe a profundidade pose ser usar o Infinity
array.flat(infinity)
*/


/*
*/
