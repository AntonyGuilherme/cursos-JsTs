//let e const
//console.log(seraquePode)
//var seraquepode='qqq' //hosting ele cria a variavel em cima e cria uma referencia aqui

import { time } from "console";
import { fileURLToPath } from "url";

/* console.log(seraquePode)
let seraquepode='qqq' o let nao possui hosting, logo isso ira gerar um erro */

let estaFrio=true
if(estaFrio){
    let action='Colocar o casaco';
}

const cpf:string='123.456.789-01'
//cpf='23'
console.log(cpf)

var numero:number=10;
function revelar(){
    var numero:number=25;
}
revelar()
console.log(numero)

//arrow sintaxe reduzida - trata o this de uma forma diferente :o this sempre eh o mesmo

const somar=function (n1:number,n2:number){return n1+n2};
console.log(somar(4,5))

const somar_arrow=(n1:number,n2:number)=>n1+n2
console.log(somar_arrow(4,5))

const hello=(pessoa:string)=>`Hello ${pessoa}`;


/*//this arrow

function normalcomthis(){
    console.log(this)
}

const normalcthis=normalcomthis.bind("Valor do this")
normalcthis();

//this ???
const arrowcomthis=()=>console.log(this)
arrowcomthis()
const arrowcthis=arrowcomthis.bind("Valor");
arrowcthis()
*/

//parametro padrao

function contagem(inicio:number=20){
        while(inicio<=20){
            inicio+=2
            console.log(inicio)
        }
}

contagem(10)


//REST-juntar os elementos em um array E SPREAD - espalhar os elementos
const number=[1,10,99,-5]
console.log(Math.max(...number))

const tA:string[]=['j','a']
const tb:string[]=['b','k',...tA]
console.log(tb)

function retornar(...numeros:number[]):number[]{
    return numeros;
}

console.log(retornar(1,2,2,2))

const tupla:[number,string,boolean]=[1,'abc',false];
function tuplaparam(a:number,b:string,c:boolean){
    console.log(`${a} ${b} ${c}`)
}

tuplaparam(...tupla)

function tuplaparam2(...params:[number,string,boolean]){
    console.log(`${params[0]} , ${params[1]} ,${params[2]}`)
}

tuplaparam2(...tupla)

//Destructuring (array)

const caract=['motor',2020]
const [motor,ano]=caract;
console.log(motor,ano)

//Destructuring object

const item={name:'ssd',price:'2222'}
const {name:n,price:p}=item;
console.log(n,p)

//template string
const usuario=10;
const nome_u=20;
console.log(`${nome_u>usuario ? true :false}`)


//DESAFIO

const dobro = (nw:number):number => nw*2;
console.log(dobro(10))

// Exercicio 2
const dizerOla = (nome : string = 'Pessoa') => {
    console.log("Ola, " + nome)
}
dizerOla()
dizerOla('Antony')

// Exercicio 3
const numsxe = [-3, 33, 38, 5]
console.log(Math.min(...numsxe))

// Exercicio 4
const array:number[] = [55, 20]
console.log(array.push(...numsxe))


// Exercicio 5
const notas:number[] = [8.5, 6.3, 9.4]
const [nota1,nota2,nota3] = notas;
console.log(nota1, nota2, nota3)


// Exercicio 6
const cientista = {primeiroNome: "Will", experiencia: 12}
const {primeiroNome,experiencia} = cientista;
console.log(primeiroNome, experiencia)


//Callback

function esperar(callback :(dado:string)=> void){
    setTimeout(()=>{callback('3 segundos')},3000)
}
esperar((dados:string)=>{console.log(dados)})


function esperarPromisse(){
    return new Promise((resolve:any)=>{
        setTimeout(()=>{resolve('3 depois')},3000)
    })
}

esperarPromisse().then(dado=>console.log(dado))

fetch('https://swapi.com/api/people/1').
then(res=>res.json())
.then(personagem=>personagem.films)
.then(films=>fetch(films[0]))
.then(resFilm => resFilm.json())
.then(filme => console.log(filme))