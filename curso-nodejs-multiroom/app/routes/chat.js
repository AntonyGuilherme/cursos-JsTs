module.exports = (app) => {

    app.get('/chat',(request,response)=>{
        app.app.controllers.chat.iniciaChat(app,request,response);
    });
    app.post('/chat',(request,response)=>{
        app.app.controllers.chat.iniciaChat(app,request,response);
    });

}