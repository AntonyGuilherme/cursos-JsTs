const { Observable , noop } = require('rxjs');

const obs = Observable.create(subscriber => {

    subscriber.next('RxJS');

    if (Math.random() > 0.5)
        subscriber.complete('Completo');
    else
        subscriber.error('Que problema');


});

obs.subscribe(

    valor => console.log(valor),
    error => console.log(error),
    () => console.log('Quando o complete é chamado')

);


obs.subscribe({

    next(valor) {
        console.log(valor);
    },

    error(error) {
        console.log(error);
    },

    complete() {
        console.log('Complete')
    }


});





const obsdesafio = (min, max) => new Observable(subscribe => {

    if (typeof min === 'number' && typeof max === 'number') {

        for (let index = min ; index <= max; index++)
            subscribe.next(index);

        subscribe.complete();
    }

    else {
        subscribe.error('Invalid values');
    }


});


obsdesafio(4, 10).subscribe(

    num => console.log(`num =${num}`),
    error => console.log(error),
    () => console.log('IS completed')
);


obsdesafio(4,10).toPromise().then(console.log); //pega o último dado