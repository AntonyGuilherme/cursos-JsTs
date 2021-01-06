//@logClass 
// a classe é passada como parâmetro pcara o decorator
//o decorator só é chamado na declarção da classe nesse caso
//---------------------------------------------------------

@logClasse(true)
class Eletro{




}

function logClass(constructor:Function){
    console.log(constructor)
}

//factory decorator personalizado
function logClasse(valor:boolean){
    return valor ? logClass : function (_:Function):void{} ;
}



type Constructor = { new(...args:any[]):{} };

function logarObject(constrctor:Constructor){
    console.log('carregado')
    return class extends constrctor {

        constructor(...args: any[]){
            console.log('Antes...');
            super(...args)
            console.log('depois')
        }

    }

}

@logarObject
class testeDec{

}

//new testeDec()
//new testeDec()

interface testePrintable{
    imprimir?():void
}

function printable(constructor:Function){
    
    constructor.prototype.imprimir =function():void{
        console.log(this)
    }

}

@printable
class testePrintable{

}

const testePrint=new testePrintable();
testePrint.imprimir && testePrint.imprimir(); //chamando a função imprimir


//Desafio decorator
const usuarioLogado = {
    nome: 'Guilherme Filho',
    email: 'guigui@gmail.com',
    admin: false
}

//@perfilAdminProfessor
class MudancaAdministrativa {
    critico() {
        console.log('Algo crítico foi alterado!')
    }
}
 
new MudancaAdministrativa().critico()

function perfilAdmin(constructor:Function){

    constructor.prototype.critico= usuarioLogado && usuarioLogado.admin ? constructor.prototype.critico : function():void{throw(new Error('Usuário não autorizado'))}

}

function perfilAdminProfessor<T extends Constructor>(constructor:T){
    return class extends constructor{

            constructor(...args:any[]){
                super(...args)

                if(!usuarioLogado || !usuarioLogado.admin)
                    throw new Error('Error')
            }

    }
}


class ContaCorrente{
    @naoNegativo
    private saldo:number;
    constructor(saldo:number){
        this.saldo=saldo;
    }

    @congelar
    sacar(@paramInfo valor:number){

        if(valor<=this.saldo){
            this.saldo -= valor
            return true
}
        else{
           // return false;
       }
    }

    @congelar
    getSaldo(){
        return this.saldo;
    }

}

const cc= new ContaCorrente(10248.57)
cc.sacar(999999999)
console.log(cc.getSaldo())

//object.feeze
function congelar(alvo:any,nomeProp:string,descritor:PropertyDescriptor){
    console.log(alvo,nomeProp)
    descritor.writable=false;
}

function naoNegativo(alvo:any , nomePropriedade:string){
    delete alvo[nomePropriedade]

    Object.defineProperty(alvo,nomePropriedade,{
        get:function():any{
            return alvo['_'+nomePropriedade]
        }
        ,
        set:function(valor:any):void{
            if(valor < 0)
                throw new Error('saldo inválido')
            else{
                alvo["_"+nomePropriedade]=valor
            }    
        }
    })
}


function paramInfo(alvo:any , nomeMetodo:string , 
    indiceParam:number){

        console.log(alvo,nomeMetodo,indiceParam);

}