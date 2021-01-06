//const dbconnection = require('../../config/dbconnection')();


module.exports = function (app) {

    app.get('/noticia', function (request, response) {
        const dbconnection = app.config.dbconnection();
        const noticiasModel = app.app.models.noticias;
     
        noticiasModel.getNoticia(dbconnection , function(error , result) {
            response.render('noticias/noticia.ejs', { noticia : result });
        });
     
    });

};