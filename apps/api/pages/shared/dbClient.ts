import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5440,
  user: "postgres",
  password: "password",
  database: "postgres",
});

export const dbClient = drizzle(pool);
