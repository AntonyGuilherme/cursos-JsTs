module.exports = (app) => {
    app.get('/', function (request , response) {
            app.app.controllers.index.home(app,request,response);
    })
}