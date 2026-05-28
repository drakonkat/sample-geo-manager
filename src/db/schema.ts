import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["admin", "geometra", "cliente"] })
    .notNull()
    .default("cliente"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const clienti = sqliteTable("clienti", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  cognome: text("cognome").notNull(),
  email: text("email"),
  telefono: text("telefono"),
  indirizzo: text("indirizzo"),
  codiceFiscale: text("codice_fiscale"),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
});

export const pratiche = sqliteTable("pratiche", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titolo: text("titolo").notNull(),
  descrizione: text("descrizione"),
  stato: text("stato", {
    enum: ["aperta", "in_corso", "sospesa", "chiusa"],
  })
    .notNull()
    .default("aperta"),
  indirizzo: text("indirizzo"),
  foglio: text("foglio"),
  particella: text("particella"),
  sub: text("sub"),
  clienteId: integer("cliente_id").references(() => clienti.id, {
    onDelete: "set null",
  }),
  geometraId: integer("geometra_id").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
});

export const documenti = sqliteTable("documenti", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type"),
  dimensione: integer("dimensione"),
  praticaId: integer("pratica_id")
    .notNull()
    .references(() => pratiche.id, { onDelete: "cascade" }),
  caricatoDa: integer("caricato_da")
    .notNull()
    .references(() => users.id),
  visibileAlCliente: integer("visibile_al_cliente", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
});
