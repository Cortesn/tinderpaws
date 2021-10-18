/* 
Connects to a MariaDB instance running on Amazon RDS
*/

import mysql from 'mysql';
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : "tinder-paws.cciyqrxtn6es.us-west-2.rds.amazonaws.com",
  user            : "admin",
  password        : "meowmeow",
  database        : "tinder_paws"
});
export default pool;
