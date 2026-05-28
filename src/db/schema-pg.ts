import { pgTable, serial, varchar, text, timestamp, boolean, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 20, enum: ["admin", "geometra", "cliente"] })
    .notNull()
    .default("cliente"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
});

export const clienti = pgTable("clienti", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  cognome: varchar("cognome", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  telefono: varchar("telefono", { length: 50 }),
  indirizzo: varchar("indirizzo", { length: 500 }),
  codiceFiscale: varchar("codice_fiscale", { length: 20 }),
  userId: serial("user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pratiche = pgTable("pratiche", {
  id: serial("id").primaryKey(),
  titolo: varchar("titolo", { length: 255 }).notNull(),
  descrizione: text("descrizione"),
  stato: varchar("stato", {
    length: 20,
    enum: ["aperta", "in_corso", "sospesa", "chiusa"],
  })
    .notNull()
    .default("aperta"),
  indirizzo: varchar("indirizzo", { length: 500 }),
  foglio: varchar("foglio", { length: 50 }),
  particella: varchar("particella", { length: 50 }),
  sub: varchar("sub", { length: 50 }),
  clienteId: serial("cliente_id").references(() => clienti.id, {
    onDelete: "set null",
  }),
  geometraId: serial("geometra_id").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const praticheClienti = pgTable(
  "pratiche_clienti",
  {
    id: serial("id").primaryKey(),
    praticaId: serial("pratica_id")
      .notNull()
      .references(() => pratiche.id, { onDelete: "cascade" }),
    clienteId: serial("cliente_id")
      .notNull()
      .references(() => clienti.id, { onDelete: "cascade" }),
  },
  (t) => [unique().on(t.praticaId, t.clienteId)]
);

export const documenti = pgTable("documenti", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }),
  dimensione: serial("dimensione"),
  praticaId: serial("pratica_id")
    .notNull()
    .references(() => pratiche.id, { onDelete: "cascade" }),
  caricatoDa: serial("caricato_da")
    .notNull()
    .references(() => users.id),
  visibileAlCliente: boolean("visibile_al_cliente")
    .notNull()
    .default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  titolo: varchar("titolo", { length: 255 }).notNull(),
  messaggio: text("messaggio"),
  stato: varchar("stato", {
    length: 20,
    enum: ["aperto", "in_lavorazione", "risolto"],
  })
    .notNull()
    .default("aperto"),
  praticaId: serial("pratica_id").references(() => pratiche.id, {
    onDelete: "set null",
  }),
  clienteId: serial("cliente_id")
    .notNull()
    .references(() => clienti.id, { onDelete: "cascade" }),
  geometraId: serial("geometra_id").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
