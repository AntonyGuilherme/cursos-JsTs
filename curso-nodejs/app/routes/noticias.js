//const dbconnection = require('../../config/dbconnection')();


module.exports = function (app) {

    app.get('/noticias', function (request, response) {
        const dbconnection = app.config.dbconnection();
        const noticiasModel = app.app.models.noticiasModel ;
        noticiasModel.getNoticias(dbconnection , function(error, result){
            response.render('noticias/noticias.ejs', { noticias : result });
    });

    });

};
