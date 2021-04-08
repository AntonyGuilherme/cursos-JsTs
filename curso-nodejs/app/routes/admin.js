
module.exports =function(app){
    app.get('/formulario_inclusao_noticias', function (request, response) {
        response.render("admin/form_add_noticia.ejs",{validacao : false});
    });

    app.post('/noticias/salvar' , function(request , response){
        const noticia = request.body ;
        const dbconnection = app.config.dbconnection();
        const NoticiasDAO = new app.app.models.NoticiasDAO(dbconnection);

        request.assert('titulo','O Título é obrigatório!').notEmpty();
        request.assert('resumo','O Resumo é obrigatório!').notEmpty();
        request.assert('resumo','O Resumo deve contar entre 10 e 100 chars!').len(10,100);
        request.assert('autor_noticia','O Autor é obrigatório!').notEmpty();
        request.assert('data_noticia','Data é obrigatório').notEmpty().isDate({format : 'YYYY-MM-DD'});
        request.assert('noticia','Notícia é obrigatória').notEmpty();
        const erros = request.validationErrors();

         if(erros){
             response.render("admin/form_add_noticia.ejs",{validacao : erros , noticia });
             return;
        }

        NoticiasDAO.salvarNoticia(noticia, function (error, result) {
            response.redirect('/noticias');
        });
    })
};
    