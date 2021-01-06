const promise = (tempo = 2000) => new Promise((resolve) => {

    setTimeout(() => {
        resolve()

    }, tempo);

});

//promise()
//.then(()=>console.log('Esperando'))
//.then(promise)
//.then(promise)

async function executar(){

     await promise();
     console.log('Promise 1')
     await promise();
     console.log('Promise 2')
     await promise();
     console.log('Promise 3')   

}

//executar()


async function retornarValor(){

    return new Promise(resolve =>{
        setTimeout(() => resolve(10) , 5000)
    });
}



async function testeAwait(){

    let valor = await retornarValor() ; // recebe o valor resolvido
    await promise();
    console.log(`${++valor}`);
    await promise();
    console.log(`${++valor}`);
    await promise();
    console.log(`${++valor}`);

    return valor + 3 ;

}

//testeAwait().then(console.log)


async function teste(){
    return `Promise aqui`;
}

teste().then(console.log)

