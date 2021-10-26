/* 
Connects to a MariaDB instance running on Amazon RDS
*/
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql';
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.SERVER_ADDRESS,
  user            : process.env.USER,
  password        : process.env.PASSWORD,
  database        : process.env.DATABASE
});
export default pool;
