function echo(objeto: any) {
    return objeto;
}

console.log(echo('joaão').length)

//USANDO GENERICS - tipo de definido tardiamente , 
//dessa forma não perdemos as propriedades da  tipagem
//pode usar qualquer nome no lugar de T 
function echoMelhorado<T>(object: T): T {
    return object;
}

//t assume o tipo pode ser definido ou não
//console.log(echoMelhorado<number>(27)) ; console.log(echoMelhorado(27))   

//Generics disponíveis na api

const avaliacoes: Array<number> = [10, 9.3, 7.7]
avaliacoes.push(8.4)
//avaliacoes.push('5.5')
console.log(avaliacoes)

//Array
function imprimir<T>(args: T[]) {
    args.forEach(element => console.log(element));
}

type Person = { nome: string, idade: number };

imprimir([1, 2, 3, 4])
imprimir<number>([1, 2, 3, 3])
imprimir<string>(['A'])
imprimir<Person>([{ nome: 'antony', idade: 27 }])

//Tipo utilizando generics

const chamarEcho: <T>(data: T) => T = echoMelhorado
//const chamarEcho:(data:any) => any
console.log(chamarEcho(123))


//Classe com Generics

abstract class OpercaoBinaria<T, R>{
    constructor(public operando1: T, public operando2: T) { }

    abstract executar(): R
}



class SomaBinaria extends OpercaoBinaria<number, number>{
    executar(): number {
        return this.operando1 + this.operando2
    }
}


console.log(new SomaBinaria(3, 7).executar())


//DESAFIO
abstract class Args<T, R>{

    constructor(public arg1: T, public arg2: T) { }

    abstract request(): R

}

class Desafio_Data extends Args<Date, number>{

    request(): number {

        return Math.trunc((this.arg1.getTime() - this.arg2.getTime()) / (1000 * 60 * 60 * 24))

    }

}

console.log('Diferença de dias é :', new Desafio_Data(new Date(), new Date(2020, 4, 1)).request())


//DESAFIO CLASSE FILA ATRIBUTOS: FILA (ARRAY)
//FUNCTIONS ENTRAR , PRÓXIMO , IMPRIMIR

class Fila<T extends number | string>{

    constructor(private ItensFila: T[]) { }


    inToFila(item: T) {
        this.ItensFila.push(item)
    }

    nextItemFila() {
        this.ItensFila.splice((this.lengthFila() - 1), 1);
    }

    printFila(text: string) {
        this.ItensFila.forEach(item => console.log(text, item));
    }

    lengthFila() {
        return this.ItensFila.length;
    }


}

const banco = new Fila<string>(['Antony', 'Guilherme'])
banco.inToFila('Helena');
banco.printFila('Pessoa : ');


//MAPA

type keyValue<K,V> = { key: K, value: V };


class Mapa<K, V> {
    constructor(private itens:keyValue<K,V>[]) { }

    addToMap(item: keyValue<K,V>) {
        this.itens.push(item);
    }

    imprimir() {
        console.log(this.itens)
    }

    getItemFromMap(key: K):keyValue<K,V> | null {
        return this.itens.filter(element => element.key === key)[0] ?? null;
    }

    cleanMap() {
        this.itens.splice(0);
    }

}

const MyMap = new Mapa<number, string>([{ key: 0, value: 'Antony' }]);
MyMap.addToMap({ key: 1, value: 'Guilherme' });
console.log(MyMap.getItemFromMap(0))
MyMap.imprimir();