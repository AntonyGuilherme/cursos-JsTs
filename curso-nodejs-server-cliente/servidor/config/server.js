/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* middleware que configura páginas de status */
app.use(function(req,res,next){

	res.status(404).render('erros/404.ejs');

	// permite que após a execução da trativa seja dada a continuidade na execução do servidor
	next();

});	

/* middleware que configura erros internos */
app.use(function(err,req,res,next){

	res.status(500).render('erros/500.ejs');

	// permite que após a execução da trativa seja dada a continuidade na execução do servidor
	next();

});	


/* exportar o objeto app */
module.exports = app;