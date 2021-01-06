//Interfaces Não são compiladas somente 
//para fins de desenvolvimento

interface Humano{
    nome:string,
    idade?:number,
    [prop:string]:any //nome não conhecido ,
    saudar(sobrenome:string) :void
}


function saudar(pessoa:Humano){

    console.log(pessoa.nome)



}


const ChangeName=(pessoa:Humano,newName:string)=> pessoa.nome=newName;


const pessoa:Humano={
    nome : 'João',
    idade: 27,
    WWWWW:'antony',
    saudar(sobrenome:string) {
        console.log('Olá , meu nome é ' ,
         this.nome ,sobrenome);
    } 
}

pessoa.saudar('Amaral')
saudar(pessoa);
ChangeName(pessoa,'Antony');
saudar(pessoa);



//Classes

class Cliente implements Humano{
    //posso colocar atributos a mais e continuo respeitando 
    //o interface Humano

    constructor(nome:string='Antony'){
        this.nome=nome;
    }
    data:Date=new Date()
    nome:string='';
    saudar(sobrenome:string){
        console.log(this.nome,sobrenome,this.data);
    }

}

const cliente=new Cliente('ANTONY') .saudar('amaral');


//INTERFACE IN FUNCTIONS
interface FunctionCalc{
    (numeroa:number,numerob:number):number
}


const CALCULO:FunctionCalc=(base:number,exp:number):number=>{
            //array com tamanho exp fill preenche todos os elementos com base e reduce multiplica cada elemento
    return Array(exp).fill(base).reduce((t,a)=> t*a )


}

console.log(CALCULO(10,2))


//Herança em interfaces

interface A {
    a():void
}

interface B{
    b():void
}

interface ABC extends A,B{
    c():void
}

class RealA implements A{
    a():void{
        console.log()
    }
}

class RealAB implements A,B {

    a():void{}
    b():void{}
    
}

class RealABC implements ABC{
    a():void{}
    b():void{}
    c():void{}
}

abstract class ABSCRT_ABC implements A,B {
    a():void{}
    b():void{}
    abstract d():void
}


interface NumberX{
    numero:number;
    log():void;
}

const W:NumberX={
    numero:10,
    log() :void {console.log(this.numero)}
};

W.numero=10;
W.log();
