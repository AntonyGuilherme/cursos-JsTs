
module.exports =function(app){
    app.get('/formulario_inclusao_noticias', function (request, response) {
        app.app.controllers.admin.formulario_inclusao_noticias(app,request,response);
    });

    app.post('/noticias/salvar' , function(request , response){
        app.app.controllers.admin.noticias_salvar(app,request,response);
    })
};
    