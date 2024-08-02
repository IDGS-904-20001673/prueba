const mysql = require('promise-mysql');
require('dotenv').config();

let connectionPool = null;

async function pool() {
    if (connectionPool === null) {
        connectionPool = await mysql.createPool({
            connectionLimit: 10,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE,
            charset: 'utf8mb4',
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
    return await connectionPool.getConnection();
}
module.exports = pool;
