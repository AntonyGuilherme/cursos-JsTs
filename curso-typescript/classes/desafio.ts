// Exercício 1 - Classe


class Moto {
    constructor(public nome:string,public velocidade:number=0){}
 
    buzinar():void {
        console.log('Toooooooooot!')
    }
 
    acelerar(delta:number) {
        this.velocidade = this.velocidade + delta
    }

}
 
const moto = new Moto('Ducati')
moto.buzinar()
console.log(moto.velocidade)
moto.acelerar(30)
console.log(moto.velocidade)
 

// Exercício 2 - Herança
class objeto2D  {
    constructor(private base:number,private altura:number){}
    area():number{
        return this.base*this.altura;
    }
}
 
const retangulo=new objeto2D(5,7);
console.log(retangulo.area())
 


// Exercício 3 - Getters & Setters


class Estagiario{
    constructor(private _primeiroNome:string =''){}

    get primeiroNome():string{
        return this._primeiroNome;
    }
    set primeiroNome(valor:string){
        this._primeiroNome=valor.length>=3 ? this._primeiroNome=valor : this._primeiroNome;
    }

}

const estagiario=new Estagiario
 
console.log(estagiario.primeiroNome)
estagiario.primeiroNome = 'Le'
console.log(estagiario.primeiroNome)
estagiario.primeiroNome = 'Leonardo'
console.log(estagiario.primeiroNome)