

    class NoticiasDAO{

        _connection =  null;
        
        constructor(connection){
            this._connection = connection;
        }

        getNoticia(callback){
            this._connection.query('select * from noticias where id_noticias = 2' , callback);
        }

        getNoticias(callback){
            this._connection.query('select * from noticias' , callback);
        }

        salvarNoticia(noticia,callback){
            console.log(noticia)
            this._connection.query(`insert into noticias set ?` , noticia , callback);
        }

    }





module.exports = () => NoticiasDAO;