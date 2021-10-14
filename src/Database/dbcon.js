/* 
Connects to a MariaDB instance running on Amazon RDS
*/

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : [endpointAddress],
  user            : [userName],
  password        : [password],
  database        : [databaseName]
});
module.exports.pool = pool;
