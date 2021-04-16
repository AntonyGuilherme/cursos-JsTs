 
 //importar o módulo do framework express
 const express = require('express');

 //importar o modulo do consign
 const consign = require('consign');
 
 //importar o body-parse
const bodyParser = require('body-parser');

//importar o express-validator
const expressValidator = require('express-validator');

// iniciar o objeto do express
const app = express();

// setar as variáveis 'view wngine' e 'views' do express
app.set('view engine','ejs');
app.set('views','./app/views');

// configurar o middleware express.static
app.use(express.static('./app/public'));

//configurar o middleware body-parser
app.use(bodyParser.urlencoded({extended : true}));

//configurar o middleware express-validator
app.use(expressValidator());

/*
* Socket é um mecanismo de comunicação utilizado para implementar um modelo cliente-servidor que permite a troca de mensagens
* entre processos de uma máquina ou aplicação servidor e de uma máquina ou aplicação cliente
? WebSocket permite a comunicação bidirecional entre browsers clientes e servidores web sobre um único socket
? em outras palavras podemos criar uma conexão persistente entre o cliente e o servidor e ambas as partes podem 
? começar a enviar dados a qualquer momento isso significa que com o websocket podemos fugir do paradigma padrão
? de sistemas web , em que um browser cliente faz uma requisão e fica aguradando uma requisão 
? atráves do websocket o servidor pode efetuar requisições // ON do firebase
*/


// realizar o autoload das rotas, dos models e dos controllers para o objeto app
consign()
.include('app/routes')
.then('app/models')
.then('app/controllers')
.into(app);

//exportar o objeto app
module.exports = app;


