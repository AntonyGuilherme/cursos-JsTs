const {Observable} = require('rxjs');

function off(time,...elements){
    return Observable.create( subscriber =>{

        (elements || []) .forEach((el,i) =>{
            setTimeout(() =>{
                
                subscriber.next(el);
                if(elements.length === i+1)
                    subscriber.complete();
            
            } , time * i);


        })

    })
}

off(1000,1,2,3,4,5,false,[1,2,3,4]).subscribe(console.log);