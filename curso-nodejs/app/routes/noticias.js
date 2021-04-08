//const dbconnection = require('../../config/dbconnection')();


module.exports = function (app) {

    app.get('/noticias', function (request, response) {
        const dbconnection = app.config.dbconnection();
        const NoticiasDAO = new app.app.models.NoticiasDAO(dbconnection) ;
        NoticiasDAO.getNoticias( function(error, result){
            response.render('noticias/noticias.ejs', { noticias : result });
    });

    });

};
