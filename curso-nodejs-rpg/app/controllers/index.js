module.exports.index = function(application,req,res) {

    res.render('index.ejs',{validacao : [] , usuario : null});

}
module.exports.autenticar = function(application,req,res) {

    const dadosForm = req.body;
    req.assert('usuario','O Usuário não deve ser vazio.').notEmpty();
    req.assert('senha','A senha não pode ser vazia.').notEmpty();

    const erros = req.validationErrors();
    if(erros){
        res.render("index.ejs",{validacao : erros , usuario : dadosForm.usuario });
    }
    else{

        const connection = application.config.dbConnection;
        const UsusariosDao = new application.app.models.UsuariosDAO(connection);
        UsusariosDao.autenticar(dadosForm,req,res);
    }


}