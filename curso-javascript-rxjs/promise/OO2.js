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

const p1 = new Produto('caneta',8.59) ;
console.log(p1.precofinal);
const p2 = new Produto('Geladeira',2345.98);
console.log(p2.precofinal);

console.log(p1._nome);

console.log(typeof Produto) 