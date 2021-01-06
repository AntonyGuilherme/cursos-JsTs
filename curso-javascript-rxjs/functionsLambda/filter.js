
//*function filter recebe uma function como parâmetro 
//*que deve retornar 
//*um boolean caso for verdadeiro aquele object fará parte 
//*do novo array
//*retornado

const filtrado = [1, 2, 3, 4, 5, 6, 7, 8].filter(element => element >= 6);
console.log(filtrado)

class carrinho {

    nome;
    qtde;
    preco;

    constructor(nome, qtde, preco) {

        this.nome = nome;
        this.qtde = qtde;
        this.preco = preco;


    }


    getObject() {
        return {
            nome: this.nome.valueOf(),
            qtde: this.qtde.valueOf(),
            preco: this.preco.valueOf()
        };
    }

}

const carrinhos = [
    new carrinho('Caneta', 10, 7.99).getObject(),
    new carrinho('Impressora', 0, 649.50).getObject(),
    new carrinho('Caderno', 4, 27.10).getObject()
];



const qtdMoreTen = (item) => item.qtde > 0;
const mapName = (item) => item.nome ;
const itensValidos = carrinhos.filter(qtdMoreTen).map(mapName);
console.log(itensValidos);


Array.prototype.MyFilter = function (callback) {

    const vetorFiltrado = [];
    this.forEach((element , index , vetor) => 
    
    {

    if(callback(element,index,vetor)){
        vetorFiltrado.push(element.valueOf());
    }

    }
    
    );
    
    return vetorFiltrado ;

    }


    const vetor = [1,2,3,4,5,6,7,8,9].MyFilter((element)=> element > 8 );
    console.log(vetor)




