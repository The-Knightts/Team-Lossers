import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.tsx",  // Path to your schema file
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_v1mHdgAb2RXY@ep-yellow-bonus-a8t85rxw-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  },
  out: "./drizzle",  // Path where generated files will be saved
  migrations: {
    path: './migrations',  // Path to the migrations folder
    schema: 'public',  // Specify the schema to use (default is 'public' for PostgreSQL)
  }
});
