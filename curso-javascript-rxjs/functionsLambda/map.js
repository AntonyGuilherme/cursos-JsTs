const numeros = ['Antony','Bianca','Anna'];
const teste =numeros.map((element)=> element[0]);
console.log(numeros,teste);


class carrinho{

    nome  ; 
    qtde ; 
    preco ;

    constructor(nome,qtde,preco){

        this.nome = nome ;
        this.qtde = qtde ;
        this.preco = preco ;


    }


    getObject(){
        return {
            nome:this.nome.valueOf(),
            qtde: this.qtde.valueOf(),
            preco:this.preco.valueOf()
        };
    }

}

    const carrinhos = [ 
        new carrinho('Caneta',10,7.99).getObject(),
        new carrinho('Impressora',0,649.50).getObject(),
        new carrinho('Caderno',4,27.10).getObject() 
    ];

    console.log(
        
        carrinhos.map(element => element.nome) ,
        carrinhos.map(element => element.qtde * element.preco)
    
    );


    function MAP(func , vetor){
        if(typeof func === 'function' && Array.isArray(vetor)){
            const NewVetor = [];

            for (let i = 0; i < vetor.length ; i++)
                NewVetor.push(func(vetor[i].valueOf(),i,vetor.valueOf()));
    
            return NewVetor;  
        }

        else{
            throw('Error : Parâmetros estão em formatos inadequados');
        }

    }


    console.log(MAP((num)=>num**num , [1,2,3,4,5,6,7,8,9]))



