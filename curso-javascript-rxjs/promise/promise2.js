// setTimeout(function(){

//     console.log('Executando callback');


//     setTimeout(()=>{
//         console.log('Executando callback');
//     },2000);

// },2000);

const promise = (tempo = 2000) => new Promise((resolve) => {

    console.log('Executando')
    setTimeout(() => {
        resolve('Vish')

    }, tempo);

});

let p = promise(3000).then(console.log)
