const { Observable } = require('rxjs');

const promise = new Promise(resolve =>{
    resolve(`It's Here a Promise`);
});

promise.then(console.log);

const obs = new Observable(subscriber =>{

    subscriber.next('Observer é bem legal');
    subscriber.next('Observer é bem legal');
    subscriber.next('Observer é bem legal');
    subscriber.next('Observer é bem legal');
    subscriber.next('Observer é bem legal');
    subscriber.next('Observer é bem legal');
    subscriber.next('Observer é bem legal');


});


obs.subscribe(console.log);