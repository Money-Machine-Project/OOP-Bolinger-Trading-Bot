import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  port: parseInt(process.env.DB_PORT as string), // port를 숫자로 변환
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  waitForConnections: true as boolean,
  connectionLimit: 10 as number,
  queueLimit: 0 as number,
});

export default pool;
