const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PORT, MYSQL_PASSWORD, MYSQL_DATABASE}  = process.env;

let pool;

const getConnection = async () => {
    if(!pool) {
        pool = mysql.createPool({
            connectionLimit: 10,
            host: MYSQL_HOST,
            user: MYSQL_USER,
            port: MYSQL_PORT,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE,
            timezone: 'Z',

        })

    }

    return await pool;
}

module.exports = {
    getConnection,
};

getConnection();