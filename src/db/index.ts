import * as schema from "./schema";

function createDb() {
  if (process.env.DB_URL && process.env.DB_TOKEN) {
    const { createDatabase } = require("@kilocode/app-builder-db");
    return createDatabase(schema);
  }

  const Database = require("better-sqlite3");
  const { drizzle } = require("drizzle-orm/better-sqlite3");

  const sqlite = new Database("./geogest.db");
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  const { migrate } = require("drizzle-orm/better-sqlite3/migrator");
  const instance = drizzle(sqlite, { schema });

  try {
    migrate(instance, { migrationsFolder: "./src/db/migrations" });
  } catch {
    // migrations may already be applied
  }

  return instance;
}

export const db = createDb();
