function funcionarOrNot(valor, chanceError) {

    return new Promise((resolve, reject) => {

        if (Math.random() < chanceError) {

            reject('Ocorreu um erro');

        }

        else {
            resolve(valor);
        }


    });

}


funcionarOrNot('Testando...', 1)
    .then(v => `Valor ${v}`)
    .then(console.log)
    .then(() => console.log('Por aqui') , error => console.log(error)) //cada then pode receber um catch , 
                                                                        //dessa forma nenhuma informação é passada para os próximos passos da execução
    .catch(error => console.log(`Error : ${error}`)) //depois do catch nenhum valor é passado
    