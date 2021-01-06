
module.exports =function(app){
    app.get('/formulario_inclusao_noticias', function (request, response) {
        response.render("admin/form_add_noticia.ejs");
    });

    app.post('/noticias/salvar' , function(request , response){
        const noticia = request.body ;
        const dbconnection = app.config.dbconnection();
        const noticiasModel = app.app.models.noticiasModel;
        noticiasModel.salvarNoticia(noticia,dbconnection, function (error, result) {
            console.log(result)
            response.redirect('/noticias');
        });
    })
};
    