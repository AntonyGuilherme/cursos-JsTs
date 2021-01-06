const readline = require('readline');

function obterRespostas(pergunta) {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    return new Promise((resolve) => {

        rl.question(pergunta, resp => {

            resolve(resp);
            rl.close();

        });

    });

}


function girlfriend(event) {
    console.log(event);

    console.log('N: Apagar as luzes');
    console.log('N: Pedir silêncio');
    console.log('N: Surpresa!!!');


}

function apartmentManager(event) {
    console.log(event);
    console.log('S: Monitorando o barulho!');


}

async function concierge(interessados) {

    while (true) {
        const resp = await obterRespostas('Is The boy  here ? (s/N/q)');
        if (resp.toLowerCase() === 's') {

            (interessados || []).forEach(obs => obs({ resp, date: Date.now() }));
        }
        else if (resp.toLowerCase() === 'q') {
            break;

        }
    }


}

// the subject is the  concierge

concierge([girlfriend, apartmentManager]); // registro de dois observadores ao evento