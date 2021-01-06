let p = new Promise(function(cumprirPromessa,rejeitarPromessa){

    cumprirPromessa(['antony','guilherme'])

})


/*

Cada retorno de um then é passado ao próximo
Pode-se usar quantos for preciso sem problemas

*/

p
.then((response)=> response.map(element => `Nome: ${element}`))
.then((item)=> console.log(item));


p
.then((element)=> element[0]) // primeiro nome 
.then((element)=> element[0]) // primeira letra
.then(console.log) // printando na tela equivalente á element => console.log(element)
