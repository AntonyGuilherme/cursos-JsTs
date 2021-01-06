const { of , Observable} = require('rxjs') ;

const endWith = (word) => (observable) => Observable.create(


    subscriber =>{


        observable.subscribe(

            {
                next : (element) =>{

                    if(Array.isArray(element)){

                        
                        subscriber.next( element.filter( element => element.endsWith(word) ));


                    }

                    else if(element.endsWith(word))
                        subscriber.next(element);    

                }  ,
                complete : () => subscriber.complete() ,
                error : (exception) =>  subscriber.error(exception)
            }
        );


    }





);



of(['Ana Silva' , 'Maria Silva' , 'Pedro Rocha'])
    .pipe(endWith('Silva'))
    .subscribe(console.log);
