const  crypto  = require("crypto");



class UsuariosDAO {

    /**
     * @type {Promise<mongo.MongoClient>}
     */
    #_connection = null;
    constructor(connection){

        this.#_connection =connection;

    }

    async inserirUsuario(usuario){
    
        this.#_connection()
        .then(async mongo => { 
             usuario.senha = crypto.createHash('md5').update(usuario.senha).digest("hex");
            await mongo.db('got').collection('usuarios').insertOne(usuario);
            mongo.close();
        })
        .catch(error =>{

        })
    }

    async autenticar({usuario,senha},request,response){
        this.#_connection()
        .then(async mongo => {
            const senha_crypt = crypto.createHash('md5').update(usuario.senha).digest("hex");
            const user = await mongo.db('got').collection('usuarios').find({usuario,senha : senha_crypt}).toArray();
            mongo.close();
            
            if(!!user.length){
                request.session.autorizado = !!user.length;
                request.session.usuario = user[0].usuario;
                request.session.casa = user[0].casa;
                response.redirect('jogo');
            }else{
                response.render('index.ejs',{validacao : [{msg : 'usuário não encontrado no banco de dados!'} ] , usuario})
            }

        })
        .catch(error =>{
            response.send('Erro ao tentar realizar o login!')

        })
    }

}

module.exports = () => UsuariosDAO