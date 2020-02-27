const mysql = require('mysql');

function connectDB() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'code',
        port: 3306,
        database: 'project'
    });
    return connection;
}

module.exports = {
    connect: connectDB
};