

    class NoticiasDAO{

        _connection =  null;
        
        constructor(connection){
            this._connection = connection;
        }

        getNoticia(id_noticia,callback){
            this._connection.query(`select * from noticias where id_noticias = ${id_noticia}` , callback);
        }

        getNoticias(callback){
            this._connection.query('select * from noticias order by data_criacao desc' , callback);
        }

        salvarNoticia(noticia,callback){
            console.log(noticia)
            this._connection.query(`insert into noticias set ?` , noticia , callback);
        }

        getLast5Noticias(callback){
            this._connection.query('select * from noticias order by data_criacao desc limit 5;',callback);
        }

    }





module.exports = () => NoticiasDAO;