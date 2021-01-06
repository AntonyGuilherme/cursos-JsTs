const { interval , from } = require('rxjs');

const gerarNumeros = interval(500);
const sub1 = gerarNumeros.subscribe((num) => {
    console.log(Math.pow(2, num));
});
const subs = gerarNumeros.subscribe(console.log);


setTimeout(() => sub1.unsubscribe(), 8000);
setTimeout(() => subs.unsubscribe(), 6000);

from([1,2,3]).subscribe(console.log); //transforma o array em um stream de dados
