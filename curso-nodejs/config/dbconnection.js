const mysql = require('mysql');
const connection = () => mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'portal_noticias'
});

module.exports = () => connection;