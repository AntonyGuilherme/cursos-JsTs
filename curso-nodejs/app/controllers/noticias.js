module.exports.noticias = function(app,request,response){
    const dbconnection = app.config.dbconnection();
    const NoticiasDAO = new app.app.models.NoticiasDAO(dbconnection) ;
    NoticiasDAO.getNoticias( function(error, result){
        response.render('noticias/noticias.ejs', { noticias : result });
});

}

module.exports.noticia = function(app,request,response){

    const dbconnection = app.config.dbconnection();
    const NoticiasDAO = new app.app.models.NoticiasDAO(dbconnection);
 
    NoticiasDAO.getNoticia(function(error , result) {
        response.render('noticias/noticia.ejs', { noticia : result });
    });

}