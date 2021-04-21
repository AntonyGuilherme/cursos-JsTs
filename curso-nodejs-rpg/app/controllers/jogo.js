module.exports.jogo = function (application, req, res) {

    if (!req.session.autorizado) {
        res.render('index.ejs', { validacao: [{ msg: 'Realize o login!' }] });
    } else {


        let msg = req.query.msg;

        const connection = application.config.dbConnection;
        const JogoDAO = new application.app.models.JogoDAO(connection);
        JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, msg);


    }

}


module.exports.suditos = function (application, req, res) {

    if (!req.session.autorizado) {
        res.render('index.ejs', { validacao: [{ msg: 'Realize o login!' }] });
        return;
    }


    res.render('aldeoes.ejs', { validacao: [] });


}

module.exports.pergaminhos = function (application, req, res) {
    if (!req.session.autorizado) {
        res.render('index.ejs', { validacao: [{ msg: 'Realize o login!' }] });
        return;
    }

    /*recuperar as ações realizadas no banco*/
    const usuario = req.session.usuario;
    const connection = application.config.dbConnection;
    const JogoDAO = new application.app.models.JogoDAO(connection);
    JogoDAO.getAcoes(usuario)
    .then(acoes => res.render('pergaminhos.ejs', { acoes }))
    .catch(console.log);


}

module.exports.ordenar_acao_sudito = function (application, req, res) {

    const dadosForm = req.body;
    dadosForm.usuario = req.session.usuario;
    req.assert('acao', "Ação deve ser informada!").notEmpty();
    req.assert('quantidade', "Quantidade deve ser informada!").notEmpty();

    const erros = req.validationErrors();

    if (erros) {
        res.redirect('jogo?msg=A');
        return;
    }

    const connection = application.config.dbConnection;
    const JogoDAO = new application.app.models.JogoDAO(connection);
    JogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=B');

}

module.exports.sair = function (application, req, res) {

    req.session.destroy(function (error) {
        res.render('index.ejs', { validacao: [] });
    });


}
module.exports.revogar_acao = function (application, req, res) {

    const connection = application.config.dbConnection;
    const JogoDAO = new application.app.models.JogoDAO(connection);
    const {id_acao} = req.query;
    JogoDAO.revogar_acao(id_acao,res);

}