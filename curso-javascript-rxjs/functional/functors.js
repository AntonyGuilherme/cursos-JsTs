//wrapper - container

const numeros = [1, 2, 3, 4, 5, 6, 7];
const novosNums = numeros.map(el => el + 10).map(el => el * 2);
console.log(numeros, novosNums);

function TipoSeguro(valor) {


    return {
        valor,
        invalido(){
            return this.valor === null || this.valor === undefined ;
        },
        map(fn) {
            if(this.invalido(null)){

                return TipoSeguro(null);
            }
            else{
                const novoValor = fn(this.valor);
                return TipoSeguro(novoValor);    
            }
        },
        flatMap(fn){
           return this.map(fn).valor ;
            
        }
    }

}

const resultado = TipoSeguro('Esse é um texto').map(t => t.toUpperCase()).map(t => `${t}!!!!`).flatMap(el=> el.split('').join(' '));
console.log(resultado);