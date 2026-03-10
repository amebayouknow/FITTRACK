const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'fittrackdb',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.log('Ошибка подключения: ', err);
    }
    console.log('Подключено к MySQL');
});

module.exports = db;
