/* 
Connects to a MariaDB instance running on Amazon RDS
*/
// added multiple statement queries 
// https://www.npmjs.com/package/mysql#multiple-statement-queries
import mysql from 'mysql';
var pool = mysql.createPool({
  multipleStatements: true,
  connectionLimit : 10,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_NAME
});
export default pool;
