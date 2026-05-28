const mod = process.env.DATABASE_URL
  ? require("./schema-pg")
  : require("./schema-sqlite");

export const users = mod.users;
export const sessions = mod.sessions;
export const clienti = mod.clienti;
export const pratiche = mod.pratiche;
export const praticheClienti = mod.praticheClienti;
export const documenti = mod.documenti;
export const tickets = mod.tickets;
