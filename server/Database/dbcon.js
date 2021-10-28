/* 
Connects to a MariaDB instance running on Amazon RDS
*/

import mysql from 'mysql';
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_NAME
});
export default pool;
