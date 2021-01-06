

const { Observable, from, of } = require('rxjs');


/**
 * 
 * @param  {...any} params Parâmetros para lógica interna
 */

function createNewPipeOperator(...params) {

    return (next = () => {}) =>
        (complete = (subscriber) => subscriber.complete()) =>
            (error = (error) => subscriber.error(error)) =>
                function (SourceObservable) {

                    return new Observable(subscriber => {

                        SourceObservable.subscribe({

                            next: (element) => next(subscriber, element, ...params),
                            complete: () => complete(subscriber, ...params),
                            error

                        });


                    });


                };


};

let lastElement = 0;

const last = createNewPipeOperator()((subscriber , element) => {
    
    lastElement = element ;

})((subscriber) => {subscriber.next(lastElement);subscriber.complete();})((error) => subscriber.error(error));


of(1, 2, 3, 4, 5)
    .pipe(
        last
    ).subscribe((element) => console.log(element))