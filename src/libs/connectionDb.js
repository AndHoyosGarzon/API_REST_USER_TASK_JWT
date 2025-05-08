import pg from "pg";
import { config } from "dotenv";

config()

const { Pool } = pg;

const pool = new Pool({
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
});

try {
  //succefully connnection to database
  pool.on("connect", () => {
    console.log("Connection successfully to database");
  });

} catch (error) {
  console.log("Error connection to database....");
  process.exit(1);
}

export default pool;
