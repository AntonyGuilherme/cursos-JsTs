/**
 *  1 operadores de criação
 * of cria um stream de dados
 * 
 *  */
const { of , from  } = require('rxjs'); 


/**
 * 2  Operadores encadeáveis Pipeable op
 * last pega o último elemento enviado pelo Obsevable
 * first pega o primeiro elemento enviado pelo Observable
 * map equivalente ao do array , porém realiza tratativas em cima dos push's do Observable
 * */  
const { last , first , map } = require('rxjs/operators');

of(1,2,'ana',false,'ultimo')  //criando um stream de dados
.pipe(first() , map((element) => `Map +++${element}`)) //pipe cria um a conexão entre os operadores 
.subscribe(console.log);

from([1,2,'ana',false,'ultimo'])
.pipe(first() , map((element) => `Map +++${element}`))  
.subscribe(console.log);


