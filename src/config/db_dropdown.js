// Dropdown database configuration
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const poolDropdown = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME1,   // DROPDOWN DATABASE
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});

export default poolDropdown;








