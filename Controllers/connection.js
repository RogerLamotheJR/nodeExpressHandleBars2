const mysql = require('mysql');
const connection;

if(process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection = mysql.createConnection({
        host:'mkorvuw3sl6cu9ms.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'i0yfbv3abk4jm6zr',
        password: 'gsazrfq3j4peo2qk',
        database: 'fenfomaqvdeuukxv'
    });
};

connection.conect();
module.exports = connection;

