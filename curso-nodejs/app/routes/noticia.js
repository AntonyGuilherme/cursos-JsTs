//const dbconnection = require('../../config/dbconnection')();


module.exports = function (app) {

    app.get('/noticia', function (request, response) {
        const dbconnection = app.config.dbconnection();
        const NoticiasDAO = new app.app.models.NoticiasDAO(dbconnection);
     
        NoticiasDAO.getNoticia(function(error , result) {
            response.render('noticias/noticia.ejs', { noticia : result });
        });
     
    });

};