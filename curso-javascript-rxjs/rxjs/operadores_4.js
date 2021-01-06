const { from, Observable } = require('rxjs');



function first() {

    return function (source) {

        return Observable.create(
            subscriber => {
                source.subscribe({

                    next(v) {
                        subscriber.next(v);
                        subscriber.complete();
                    }

                })
            }
        )

    }


}
const last = () => (source) => Observable.create(

    subscriber => {

        let lastElement;



        source.subscribe({

            next: (element) => lastElement = element,

            complete() {
                subscriber.next(lastElement);
                subscriber.complete();
            }

        });
    }


);
const last2 = () => (source) => Observable.create(

    subscriber => {

        source.toPromise().then((response)=>{

            subscriber.next(response);
            subscriber.complete();



        });
    }


);

from([1, 2, 3, 4, 5])
    .pipe(
        last()
    )

    .subscribe(console.log)

from([1, 2, 3, 4, 5])
    .pipe(
        last2()
    )

    .subscribe(console.log)


