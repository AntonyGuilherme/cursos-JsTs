
module.exports = function (app){
    app.get('/', function (request,response){

        app.app.controllers.home.index(app,request,response);
    
    });
}
