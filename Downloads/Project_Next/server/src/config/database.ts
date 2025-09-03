import mysql from 'mysql2/promise';

const pool = mysql.createPool({
//     /*------------------------------------------
//     *Connect db used MysqlWordbend
// //     -------------------------------------------*/
    host: 'localhost',
    user: 'root',
    password: 'hieu@1010',
    database: 'clothes_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
 /*------------------------------------------
    Docker
    -------------------------------------------*/
    // const pool = mysql.createPool({
    //     host: process.env.DB_HOST || 'localhost',
    //     user: process.env.DB_USER || 'root',
    //     password: process.env.DB_PASSWORD || 'hieu@1010',
    //     database: process.env.DB_NAME || 'clothes_db',
    //     waitForConnections: true,
    //     connectionLimit: 10,
    //     queueLimit: 0
    // });
    
    // export default pool;