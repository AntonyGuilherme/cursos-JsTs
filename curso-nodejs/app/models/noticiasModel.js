module.exports = function(app) {

    this.getNoticias=function (connection , callback){
        connection.query('select * from noticias' , callback);
    };

    this.getNoticia = function(connection , callback) {
        connection.query('select * from noticias where id_noticias = 2' , callback);
    }

    this.salvarNoticia = function( noticia ,connection , callback ) {

        connection.query(`insert into noticias set ?` , noticia , callback);

    }

    return this;

}