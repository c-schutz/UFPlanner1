import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'swe-ufplanner-db.cdyogqisqygz.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'kkZY9wXrwTfuHoenw1oU',
    database: 'sys'
}).promise()

const result = await pool.query("SELECT * from  sys_config") //gets metadata from sys_config table within sys database
//console.log(result)

const row0col0 = result[0][0]; //gets first item
console.log(row0col0);



