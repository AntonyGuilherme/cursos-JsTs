let nome:string ='joão';
console.log(nome);

let idade:number=28;
console.log(idade);

let is_old:boolean=true;


//tipos explicitos
let minhaidade
minhaidade=27
console.log(27)
minhaidade='27'
console.log(minhaidade)

//array
let hobbies :any[]=['programar','programar muito',100]
console.log(hobbies[0])
console.log(typeof hobbies)


//tuplas:array com tipos definidos para cada elemento
let endereco: [string,number,string]=["Av Principal",90,'bairro typescript']
console.log(endereco)

//enums : estrutura para definir valores pre definidos ->dias da semana
enum Cor{
    Cinza,//0
    Verde=100,//100
    Azul//101
}
let minhaCor:Cor=Cor.Verde;
console.log(minhaCor)

//any qualquer tipo
let car: any='Bw';
console.log(car);

//----------functions
function retornar_nome() :string{
    return nome;
}

function retorno():void{//void->vazio
console.log(nome)
}

function multiplicar(numA:number,numB:number):number{
    console.log(numA*numB)
return numA*numB;
}

//tipo function
let calculo :(na:number,nb:number)=>number//retorno
calculo=multiplicar;
calculo(2,4);


//objetos

let users:{nome:string,idade:number}={
    nome:'joão',
    idade:27
}

users={nome:'Maria',idade:33};
users={idade:23,nome:"antony"};

let funcinario:{ supervisores:string[],bater_ponto:(hora:number)=>string}
funcinario={supervisores:["Antony","Guilherme"] ,
 bater_ponto:(hora:number) :string=>{return hora>8 ? "Ponto fora do Normal" :"Ponto Normal"}};

console.log(funcinario.bater_ponto(9)); 


//declarando o tipo funcionario (Alias)

type Funcionario={
    supervisores:string[],
    bater_ponto:(hora:number)=>string
}

let funcinario2:Funcionario
funcinario2={supervisores:["Antony","Guilherme"] ,
 bater_ponto:(hora:number) :string=>{return hora>8 ? "Ponto fora do Normal" :"Ponto Normal"}};



//Union types usar mais de um tipo sem perder a checagem dos tipos

let nota : number|string=10
console.log(`Minha nota é ${nota}`)
nota='10'
console.log(`Minha nota é ${nota}`)

//checando tipos
let valor=10
    if(typeof valor ==="number")
        console.log("É um number")
    else
        console.log(typeof valor)    

 //tipo never -> nunca  terminara a execucao da function
 function falha(msg:string):never{
        throw new Error(msg);
 }       

 //if(8>7)
 //falha('8 é maior que sete ')

 let al :null| number=2
 

 type Contato={
     nome:string,
     tel1:string,
     tel2:string|null//pode ser uma string ou null
 }

 //let a=null tipo padrao any 

 let b=null
 b=10
 b='10'


 //Desafio correntista
 type ContaBancaria={
     saldo:number ,depositar:(valor:number)=>void
 }

 type Correntista={
     nome:string,contaBancaria:ContaBancaria,contatos:string[]
 }

 let contaBancaria:ContaBancaria = {
    saldo: 3456,
    depositar(valor:number) {
        this.saldo += valor
    }
}
 
let correntista:Correntista = {
    nome: 'Ana Silva',
    contaBancaria: contaBancaria,
    contatos: ['34567890', '98765432']
}
 
correntista.contaBancaria.depositar(3000)
console.log(correntista)