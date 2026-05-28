const schema = require("./schema");

async function main() {
  if (process.env.DATABASE_URL) {
    const { Pool } = require("pg");
    const { drizzle } = require("drizzle-orm/node-postgres");
    const fs = require("fs");
    const path = require("path");

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool, { schema });

    const dir = "./src/db/migrations";
    if (fs.existsSync(dir)) {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        for (const file of fs.readdirSync(dir).sort()) {
          if (!file.endsWith(".sql")) continue;
          const sql = fs.readFileSync(path.join(dir, file), "utf-8");
          await client.query(sql);
        }
        await client.query("COMMIT");
        console.log("PostgreSQL migrations completed");
      } catch (err: any) {
        await client.query("ROLLBACK");
        console.error("Migration error:", err.message);
      } finally {
        client.release();
      }
    }
    await pool.end();
    return;
  }

  if (process.env.DB_URL && process.env.DB_TOKEN) {
    const { runMigrations } = require("@kilocode/app-builder-db");
    const db = require("./index").db;
    await runMigrations(db, {}, { migrationsFolder: "./src/db/migrations" });
    console.log("Kilo migrations completed");
    return;
  }

  console.log("No database configured, skipping migrations");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
