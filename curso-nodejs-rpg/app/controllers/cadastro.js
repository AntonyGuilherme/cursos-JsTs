
module.exports.cadastro = function(application,req,res){
    res.render('cadastro',{validacao : {} , dadosForm : {}});
}

module.exports.cadastrar = function(application , req,res) {

    const dadosForm = req.body;
    req.assert('nome','O nome não pode ser vazio').notEmpty();
    req.assert('usuario','O usuario não pode ser vazio').notEmpty();
    req.assert('senha','O senha não pode ser vazio').notEmpty();

    const erros = req.validationErrors() ;

    if(erros){
        res.render('cadastro',{validacao : erros , dadosForm});
        return;
    }

    const connection = application.config.dbConnection;
    const UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    UsuariosDAO.inserirUsuario(dadosForm);
    const JogoDAO = new application.app.models.JogoDAO(connection);
    JogoDAO.gerarParametros(dadosForm.usuario);


    res.send('Carregado')

}