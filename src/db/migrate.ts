import { db } from "./index";

const { migrate } = require("drizzle-orm/better-sqlite3/migrator");
migrate(db, { migrationsFolder: "./src/db/migrations" });
console.log("Migrations completed");
