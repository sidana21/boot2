import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

let connectionString = process.env.DATABASE_URL;

if (!connectionString || connectionString.trim() === '') {
  const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } = process.env;
  
  if (PGHOST && PGUSER && PGPASSWORD && PGDATABASE && PGPORT) {
    connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;
    console.log('Constructed DATABASE_URL from individual PG variables');
  } else {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database? " +
      `PG vars: PGHOST=${!!PGHOST}, PGUSER=${!!PGUSER}, PGPASSWORD=${!!PGPASSWORD}, ` +
      `PGDATABASE=${!!PGDATABASE}, PGPORT=${!!PGPORT}`
    );
  }
}

export const pool = new Pool({ connectionString });
export const db = drizzle({ client: pool, schema });
