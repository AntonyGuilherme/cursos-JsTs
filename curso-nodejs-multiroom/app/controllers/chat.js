const { emit } = require("../../config/server");

module.exports.iniciaChat = (app, request, response) => {

    const dadosForm = request.body;
    request.assert('apelido', 'O Nome ou Apelido é obrigatório.').notEmpty();
    request.assert('apelido', "O Nome ou Apelido deve conter entre 3 e 15 caracteres").len(3, 15);

    const errors = request.validationErrors();
    if (errors) {
        response.render('index.ejs',{validacao : errors});
        return;
    }

    app.get('io').emit('msgParaCliente',{apelido : dadosForm.apelido , mensagem : ' acabou de entrar no chat'});
    response.render('chat.ejs',{dadosForm});


}