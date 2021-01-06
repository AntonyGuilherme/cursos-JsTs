class Produto {

    constructor(nome, preco, desc=0.15) {
        this._nome = nome;
        this.preco = preco;
        this.desc = desc;
    }


  get  precofinal(){

        return this.preco * (1 - this.desc) ;
    }

  set  _nome(nome){

    this.nome = `NOME DO PRODUTO : ${nome}`;

  }

  get _nome (){
      return this.nome ;
  }


}


Produto.prototype.log = function(){
    console.log(`Nome: ${this.nome} Preco: R$ ${this.preco}}`);
}

Object.defineProperty(Produto.prototype, 'desconto', {

    get: function(){
        return this.desc;
    },

    set: function(novoDesc){
        if(novoDesc>=0 && novoDesc <= 1)
            this.desc = novoDesc;
    }

});



Object.defineProperty(Produto.prototype, 'descString', {

    get: function(){
        return `${this.desc*100} % de desconto`;
    }

});

const prod = new Produto('geladeira',20) ;
prod .desconto = 0.99;

console.log(prod.descString);