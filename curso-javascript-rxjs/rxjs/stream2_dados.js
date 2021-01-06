const numeros = [1,2,3,4,5,6,7,8,9];

function gerarElementos(array){

    return {

        iniciar(fn){
            let indice = 0 ;
            const i = setInterval(

                () =>{
                    if(indice >= array.length){
                        clearInterval(i);
                    }
                    else{

                        fn(array[indice]);
                        indice ++;

                    }
                    
                    
                    
                }, 1000
                
                );
                
                
                return {
                    parar (){

                    clearInterval(i);

                } 

        }


        }

    }


}


const temp1 = gerarElementos(numeros).iniciar(num =>{
    console.log(Math.pow(2,num));
});



setTimeout(() => temp1.parar() , 3000)