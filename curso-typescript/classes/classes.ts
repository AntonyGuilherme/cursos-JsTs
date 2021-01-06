class  Data{
    constructor(dia:number=1,mes:number=1,ano:number=1970){
        this.dia=dia
        this.mes=mes
        this.ano=ano
    }
   public dia:number
    mes:number
    ano:number
}

const aniversario=new Data(3,11,1991)
aniversario.dia=4
console.log(aniversario.dia , aniversario.mes)

const casamento=new Data //posso omitir ()
casamento.ano=2017
console.log(casamento.ano,casamento.mes)


class Dataesperta{
    constructor(public dia :number=1 ,
                public mes:number = 1,
                public ano:number=1970){
          }
}

const dtes=new Dataesperta;
console.log(dtes.ano,dtes.mes,dtes.dia)

class Produto{
    constructor(public nome:string,
                public preco:number,
                public desconto:number=0){}

        public resumo():string{
            return `nome :${this.nome} preço : ${this.preco_desconto()} desconto : ${this.desconto*100}%`
        }
        
        private preco_desconto():number{
            return (1-this.desconto)*this.preco;
        }
}

const prod:Produto=new Produto('xbox',100,0.95);
const prod2:Produto=new Produto('ps4',100)

console.log(prod.resumo())
console.log(prod2.resumo())



class Carro{
    private velociadadeAtual:number=0
    constructor(public marca:string , 
        public modelo:string,
        private velocidadeMax:number=200){}
    
    protected alterarVeleocidade(delta:number):number{
        const novavelocidade=this.velociadadeAtual+delta
        const velocidadeValida=novavelocidade>=0 && novavelocidade<=this.velocidadeMax
        if(velocidadeValida)
            this.velociadadeAtual=novavelocidade
        else
            this.velociadadeAtual=delta>0? this.velociadadeAtual:0

        return this.velociadadeAtual;
    } 
    
    public acelerar():number{
        return this.alterarVeleocidade(5);
    }

    public frear():number{
        return this.alterarVeleocidade(-5);
    }
    
}


class Ferrari extends Carro{

    constructor(modelo: string , velocidadeMaxima:number){
        super('Ferrari',modelo,velocidadeMaxima)//construtor da classe carro
    }

    public acelerar():number{
        return this.alterarVeleocidade(25);
    }

    public frear():number{
        return this.alterarVeleocidade(-25);
    }

}

const f40=new Ferrari('f40',80);

class Pessoa{
    private _idade:number=0

    get Idade():number{
        return this._idade
    }

    set idade(valor:number){
        if(valor>=0 && valor<=120)
            this._idade=valor
        
    }

}

const pesso4=new Pessoa

pesso4.idade=10

class mat{
   static  PI:number=3.1415
    
    static area(raio:number):number{
        return Math.pow(raio,2)*this.PI;
    }

}

console.log(mat.area(50))

// uma classe abstract nao pode ser instanciada diretamente o objetivo eh utiliza em outras classes

abstract class calc{
    protected resultado:number =0
    abstract exec(...numeros:number[]):void
    

    get _resultado():number{
        return this.resultado
    }
}

class Soma extends calc{
     exec(...numeros:number[]):void{
         this.resultado=numeros.reduce((t,a)=>t+a)
     }   
}

class Mult extends calc{
    exec(...numeros:number[]):void{
        this.resultado=numeros.reduce((t,a)=>t*a)
    }   
}

let c1=new Soma()
c1.exec(2,3,4,5)
console.log(c1._resultado)


class unico{
    private static instance:unico=new unico
    private constructor(){}

    static getInstance(){
        return unico.instance
    }

    agora(){return new Date}
}

console.log(unico.getInstance().agora())

//Somente Leitura

class Aviao{
    public readonly modelo:string
    constructor(modelo:string,
    public readonly prefixo:string){
        this.modelo=modelo
    }

}