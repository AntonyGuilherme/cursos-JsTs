//const dbconnection = require('../../config/dbconnection')();


module.exports = function (app) {

    app.get('/noticias', function (request, response) {
     
        app.app.controllers.noticias.noticias(app,request,response);

    });

    app.get('/noticia', function (request, response) {
     
        app.app.controllers.noticias.noticia(app,request,response);
     
    });

};
