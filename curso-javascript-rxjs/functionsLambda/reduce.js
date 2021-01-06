
//primeiro parâmetro função que realiza operações
//segundo parâmetro item inicial para as operações

const op = (item , inicial) => (inicial*item);  

const vetor = [ 1,2 ,3,4,5,6,7,8].reduce(op,1);

console.log(vetor)

class carrinho{

    nome  ; 
    qtde ; 
    preco ;
    fragil;

    constructor(nome,qtde,preco,fragil){

        this.nome = nome ;
        this.qtde = qtde ;
        this.preco = preco ;
        this.fragil = fragil;


    }


    getObject(){
        return {
            nome:this.nome.valueOf(),
            qtde: this.qtde.valueOf(),
            preco:this.preco.valueOf(),
            fragil:this.fragil.valueOf()
        };
    }

}

    const carrinhos = [ 
        new carrinho('Caneta',10,7.99,true).getObject(),
        new carrinho('Impressora',1,649.50,true).getObject(),
        new carrinho('Caderno',4,27.10,false).getObject(),
        new carrinho('Lapis',3,5.82,false).getObject(),
        new carrinho('Tesoura',1,19.2,true).getObject()
    ];

    // const getTotal = item => item.qtde * item.preco ;
    // const somar = (acumulador,elemento) => acumulador + elemento ;
    // const TotalGeral = carrinhos.map(getTotal).reduce(somar,0);
    // console.log(TotalGeral)


    // 1. fragil
    //2. pegar preo e quantidade
    // media dos valores

    
    Array.prototype.MyReduce = function (fun , valorInicial){

        let valorTotal = valorInicial;

        if( valorInicial == 0 || valorInicial){
            
            this.forEach((element,index,array) => valorTotal = fun(valorTotal , element , index , array) );
            
        }

        else{

            this.forEach( (element,index,array)=>{
                
                valorTotal = fun(valorTotal,element,index,array);
                if(index === 0 ){
                    valorTotal = array[0];
                    
                } else

                valorTotal = fun(valorTotal,eleemnt,index,array);
                
                }
                 )

        }

        return valorTotal ;



    }

    const frageis = carrinhos.filter(element => element.fragil)
    const valoresAndquantidades = carrinhos.map( element => { return  {valor : element.preco , qtd : element.qtde}}  )
    const media =  frageis.map(
        (element,index,vetor)=> 
        element.preco*element.qtde/vetor.length)
        .reduce((valorTotal,valorPosicao)=> valorTotal+valorPosicao ,5);

    console.log(frageis,valoresAndquantidades,media);


