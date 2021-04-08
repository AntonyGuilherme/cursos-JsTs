//Habilitar o serviço MYSQL57
//Acesse em C:\Program Files\MySQL\MySQL Server 5.7\bin>mysql -u root -p
// senha : root



const mysql = require('mysql');
const connection = () => mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'portal_noticias'
});

module.exports = () => connection;