import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.tsx",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_v1mHdgAb2RXY@ep-yellow-bonus-a8t85rxw-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
  },
  out: "./drizzle",
});
