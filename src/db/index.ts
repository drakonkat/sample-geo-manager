import * as schema from "./schema";

let dbInstance: unknown;

function getDb(): ReturnType<typeof createDb> {
  if (!dbInstance) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Database = require("better-sqlite3");
    const { drizzle } = require("drizzle-orm/better-sqlite3");

    const sqlite = new Database("./geogest.db");
    sqlite.pragma("journal_mode = WAL");
    sqlite.pragma("foreign_keys = ON");

    const instance = drizzle(sqlite, { schema });

    // Run migrations lazily
    try {
      const { migrate } = require("drizzle-orm/better-sqlite3/migrator");
      migrate(instance, { migrationsFolder: "./src/db/migrations" });
    } catch {
      // migrations may already be applied
    }

    dbInstance = instance;
  }
  return dbInstance as ReturnType<typeof createDb>;
}

// Export a proxy that initializes db on first access
export const db = new Proxy({} as Record<string, never>, {
  get(_target, prop) {
    if (process.env.DB_URL && process.env.DB_TOKEN) {
      const { createDatabase } = require("@kilocode/app-builder-db");
      const remoteDb = createDatabase(schema);
      return (remoteDb as Record<string, never>)[prop];
    }
    const instance = getDb();
    const value = (instance as Record<string, never>)[prop];
    return typeof value === "function" ? value.bind(instance) : value;
  },
});
