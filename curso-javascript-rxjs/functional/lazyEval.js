function eager(a){


    //processamento pesado
    const fim = Date.now() + 2500; 
    while(Date.now()  < fim){}
    
    const valor = Math.pow(a,3);
    
    return (b) => valor + b ;

    


}

//# primeira chamada
console.time('#1');
console.log(eager(3)(100));
console.log(eager(3)(200));
console.log(eager(3)(300));
console.timeEnd('#1');

//segunda chamada

console.time('#2');

const lazy = eager(3);
console.log(lazy(100));
console.log(lazy(200));
console.log(lazy(300));

console.timeEnd('#2');
