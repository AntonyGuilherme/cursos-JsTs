const objectID = require('mongodb').ObjectID;

class JogoDAO {

    #_connection = null;

    constructor(connection) {
        this.#_connection = connection;
    }

    gerarParametros(usuario) {

        this.#_connection()
            .then(async mongo => {
                await mongo.db('got').collection('jogo')
                    .insertOne({
                        usuario: usuario,
                        moeda: 15,
                        suditos: 10,
                        temor: Math.floor(Math.random() * 1000),
                        sabedoria: Math.floor(Math.random() * 1000),
                        comercio: Math.floor(Math.random() * 1000),
                        magia: Math.floor(Math.random() * 1000)

                    });
                mongo.close();
            })
            .catch(error => {

                console.log(error)

            })

    }


    iniciaJogo(response, usuario, casa, msg) {
        return this.#_connection()
            .then(async mongo => {
                const jogo = (await mongo.db('got').collection('jogo').find({ usuario }).toArray())[0];
                response.render('jogo.ejs', { img_casa: casa, jogo, msg });
                mongo.close();

            })
            .catch(error => {
                console.log(error)

            })

    }

    acao(acao) {
        this.#_connection()
            .then(async mongo => {
                const date = new Date();
                const hour = 60 * 60 * 1000;
                let time_add = 0;
                let moeda = 0
                switch (parseInt(acao.acao)) {
                    case 1:
                        time_add = hour;
                        moeda = -2 * acao.quantidade;
                        break;

                    case 2:
                        time_add = hour * 2;
                        moeda = -3 * acao.quantidade;
                        break;

                    case 3:
                        moeda = -1 * acao.quantidade;
                        time_add = hour * 5
                        break;

                    case 4:
                        moeda = -2 * acao.quantidade;
                        time_add = hour * 5
                        break;

                    default:
                        time_add = 0;
                        break;
                }

                acao.acao_termina_em = date.getTime() + time_add;
                await Promise.all([mongo.db('got').collection('acao').insertOne(acao),
                 mongo.db('got').collection('jogo').updateOne({ usuario : acao.usuario } , { $inc : { moeda : moeda}})]);
                mongo.close();
            })
            .catch(error => {

                console.log(error)

            })
    }


    getAcoes(usuario) {
        return this.#_connection()
            .then(async mongo => {
                const acoes = (await mongo.db('got').collection('acao').find({ usuario, acao_termina_em: { $gt: new Date().getTime() } }).toArray());
                mongo.close();
                return acoes;
            });
    }

    revogar_acao(_id,response){
         this.#_connection()
        .then(async mongo => {
            await mongo.db('got').collection('acao').deleteOne({ _id : objectID(_id)})
            mongo.close();
            response.redirect("jogo?msg=D");
        });
    }


}

module.exports = () => JogoDAO;