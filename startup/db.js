const util = require('util')
const mysql = require('mysql')
const config = require("config");

var pool = mysql.createPool({
    connectionLimit: config.get("db_connectionLimit"),
    host: config.get("db_Host"),
    user: config.get("db_user"),
    password: config.get("db_password"),
    database: config.get("db_database")
})
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool