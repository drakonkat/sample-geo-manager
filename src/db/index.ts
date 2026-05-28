const schema = require("./schema");

function createDb() {
  if (process.env.DB_URL && process.env.DB_TOKEN) {
    const { createDatabase } = require("@kilocode/app-builder-db");
    const db = createDatabase(schema);

    try {
      const { runMigrations } = require("@kilocode/app-builder-db");
      runMigrations(db, {}, { migrationsFolder: "./src/db/migrations" });
    } catch {}

    return db;
  }

  if (process.env.DATABASE_URL) {
    const { Pool } = require("pg");
    const { drizzle } = require("drizzle-orm/node-postgres");

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool, { schema });

    runPostgresMigrations(pool).catch((err: Error) =>
      console.error("Migration error:", err.message)
    );

    return db;
  }

  const Database = require("better-sqlite3");
  const { drizzle: drizzleSqlite } = require("drizzle-orm/better-sqlite3");
  const { migrate } = require("drizzle-orm/better-sqlite3/migrator");

  const sqlite = new Database("./geogest.db");
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  const db = drizzleSqlite(sqlite, { schema });

  try {
    migrate(db, { migrationsFolder: "./src/db/migrations" });
  } catch {}

  return db;
}

async function runPostgresMigrations(pool: any) {
  const fs = require("fs");
  const path = require("path");
  const dir = "./src/db/migrations";

  if (!fs.existsSync(dir)) return;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const file of fs.readdirSync(dir).sort()) {
      if (!file.endsWith(".sql")) continue;
      const sql = fs.readFileSync(path.join(dir, file), "utf-8");
      await client.query(sql);
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export const db = createDb();
