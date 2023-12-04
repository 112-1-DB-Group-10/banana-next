import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

dotenv.config();

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
  connectionTimeoutMillis: 5000,
});

await client.connect();
console.log('Successfully connected to postgres database');
export const db = drizzle(client, { schema });
