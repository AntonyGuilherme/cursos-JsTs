const http = require('http');
const buffer_body = [];
const options = {
    host : 'localhost' ,
    port : 80 ,
    path: '/',
    method : 'get',
    headers : {
        Accept : 'application/json',
        'Content-type' : 'application/json'
    }
};

// http.get(options,function(res){

//     //requisição em curso , recebe pedaços da requisição chunck
//     res.on('data',function(chunck){
//        buffer_body.push(chunck)
//     });

//     //finalização da requisição
//     res.on('end',function(){
//         const body_response = Buffer.concat(buffer_body).toString();
//         console.log(body_response);
//     });

//     res.on('error',function(){
        
//     })

// });


//Content-type 
const html = 'nome=Jose'; // x-www-form-urlencoded
const json = {nome : 'José'};
const str_json = JSON.stringify(json);
const request = http.request(options,function(res){

    //requisição em curso , recebe pedaços da requisição chunck
    res.on('data',function(chunck){
       buffer_body.push(chunck)
    });

    //finalização da requisição
    res.on('end',function(){
        const body_response = Buffer.concat(buffer_body).toString();
        console.log(body_response);
        console.log(res.statusCode);
    });

    res.on('error',function(){
        
    })

});

//request.write(str_json);
request.end();


// ----------------------- STATUS CODE ------------------------------------
/**
 * * Classe 2(00) => indica que o pedido do cliente foi recebido e compreendido
 * * Classe 3(00) => indica que outra ação precisa ser tomada pelo agente do cliente
 * * Classe 4(00) => indica que o cliente possivelmente cometeu algum tipo de erro na requisição
 * * Classe 5(00) => erro no servidor o queal pode ser causado com o cliente
 */



