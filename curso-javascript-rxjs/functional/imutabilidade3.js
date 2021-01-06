const pessoa = {
    Nome : 'Maria' ,
    altura : 1.76 ,
    cidade : 'São Paulo',
    end :{
        rua : 'ABC'
    }
};

//atribuição de referência
const novaPessoa = pessoa ;

//referência
function alterarPessoa(novaPessoa){
    novaPessoa.Nome = 'Walter';
}

function alterarPessoa2(pessoa){
    const novaPessoa = {...pessoa} ; //clone raso assim como Object.assign
    novaPessoa.Nome = 'Willian'; 
    novaPessoa.end.rua = 'CBA';
    return novaPessoa;

}

novaPessoa.Nome = 'João';
novaPessoa.cidade = 'Fortaleza';
console.log(pessoa);
alterarPessoa2(pessoa);
console.log(pessoa);

alterarPessoa(pessoa);
console.log(pessoa);


let a = 3 ;
let b = a; //atribuição por valor

a++;
b--;

console.log(a,b);