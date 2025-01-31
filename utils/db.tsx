import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from './schema';

// Use the database URL directly for Drizzle (NeonClient)
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL!);

// Correctly pass the sql (NeonQueryFunction) and schema to drizzle
export const db = drizzle(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL!, { schema });
