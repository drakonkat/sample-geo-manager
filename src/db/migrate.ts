import * as schema from "./schema";

if (!process.env.DB_URL || !process.env.DB_TOKEN) {
  console.log("Database environment variables not set, skipping migrations");
  process.exit(0);
}

const { createDatabase, runMigrations } = require("@kilocode/app-builder-db");
const db = createDatabase(schema);

runMigrations(db, {}, { migrationsFolder: "./src/db/migrations" });

console.log("Migrations completed successfully");