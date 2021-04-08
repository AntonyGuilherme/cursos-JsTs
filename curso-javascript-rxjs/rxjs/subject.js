const {Observable, Subject} = require('rxjs');

function getObservable(){

    return new Observable(subscriber => {
        setTimeout(()=>{
            subscriber.next(Math.random())
        },1000)
    })
}

const obs = getObservable();
//execusões diferentes
obs.subscribe(console.log);
obs.subscribe(console.log);


function getSubject(){

    const sub = new Subject();
    setTimeout(()=>{

        console.log('#1 obs...');
        sub.next(Math.random());
        sub.complete();

    },1000)

    return sub;


}

//mult-cast
const sub = getSubject();
sub.subscribe(console.log);
sub.subscribe(console.log);

