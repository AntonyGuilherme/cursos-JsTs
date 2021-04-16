module.exports.index = function (app, request, response) {

    const connection = app.config.dbconnection();
    const noticiasModel = new app.app.models.NoticiasDAO(connection);
    noticiasModel.getLast5Noticias((error, result) => {
        console.log(result)

        response.render("home/index.ejs" , { noticias : result });

    });




}