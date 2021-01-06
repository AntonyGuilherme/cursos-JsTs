const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const app = express() ;//*Pegando o retorno da function
app.set('view online','ejs'); //* informando que o ejs será o processador de html
app.set('views','./app/views');
app.use(bodyParser.urlencoded({extended : true})); 

consign()
    .include('app/routes')
    .then('config/dbconnection.js')
    .then('app/models')
    .into(app);

module.exports = app ;
