import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

dotenv.config();

export const client = new Client({
  connectionString: process.env.POSTGRES_URL,
  connectionTimeoutMillis: 5000,
});

client.connect();
export const db = drizzle(client, { schema });
