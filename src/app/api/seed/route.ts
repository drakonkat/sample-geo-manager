import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/db";
import { users, clienti, pratiche, praticheClienti, tickets } from "@/db/schema";

export async function POST() {
  try {
    const existingUsers = await db.select().from(users).limit(1);
    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "Database già popolato. Seed non eseguito." },
        { status: 409 }
      );
    }

    const passwordHash = await hash("password123", 10);

    await db.insert(users).values([
      {
        name: "Marco Bianchi",
        email: "admin@geogest.it",
        passwordHash,
        role: "admin",
      },
      {
        name: "Laura Verdi",
        email: "laura@geogest.it",
        passwordHash,
        role: "geometra",
      },
      {
        name: "Giuseppe Rossi",
        email: "giuseppe@geogest.it",
        passwordHash,
        role: "cliente",
      },
    ]);

    await db.insert(clienti).values([
      {
        nome: "Giuseppe",
        cognome: "Rossi",
        codiceFiscale: "RSSGPP85M15F205Z",
        email: "giuseppe@geogest.it",
        telefono: "+39 339 1234567",
        indirizzo: "Via Garibaldi 42, Milano",
        userId: 3,
      },
      {
        nome: "Anna",
        cognome: "Colombo",
        codiceFiscale: "CLMNNA72A41F205X",
        email: "anna.colombo@email.it",
        telefono: "+39 347 6543210",
        indirizzo: "Via Mazzini 15, Roma",
      },
      {
        nome: "Franco",
        cognome: "Esposito",
        codiceFiscale: "SPFNC68D12F205K",
        email: "franco@email.it",
        telefono: "+39 335 9876543",
        indirizzo: "Corso Italia 88, Napoli",
      },
      {
        nome: "Maria",
        cognome: "Ricci",
        codiceFiscale: "CSSMRA90B55F205W",
        email: "maria.ricci@email.it",
        telefono: "+39 328 1122334",
        indirizzo: "Piazza Duomo 3, Firenze",
      },
    ]);

    await db.insert(pratiche).values([
      {
        titolo: "Frazionamento Terreni Via Garibaldi",
        descrizione: "Frazionamento di terreni agricoli in Via Garibaldi 42, Milano.",
        stato: "aperta",
        indirizzo: "Via Garibaldi 42, Milano",
        foglio: "15",
        particella: "234",
        clienteId: 1,
        geometraId: 2,
      },
      {
        titolo: "Accatastamento Villa Signorile",
        descrizione: "Accatastamento di nuova costruzione.",
        stato: "in_corso",
        indirizzo: "Via Mazzini 15, Roma",
        foglio: "8",
        particella: "112",
        sub: "3",
        clienteId: 2,
        geometraId: 2,
      },
      {
        titolo: "Variazione Catastale Corso Italia",
        descrizione: "Variazione catastale per ristrutturazione edilizia.",
        stato: "in_corso",
        indirizzo: "Corso Italia 88, Napoli",
        foglio: "22",
        particella: "78",
        clienteId: 3,
        geometraId: 2,
      },
      {
        titolo: "Pratica di Successione",
        descrizione: "Successione catastale per trasferimento proprietà immobiliare.",
        stato: "aperta",
        indirizzo: "Piazza Duomo 3, Firenze",
        foglio: "5",
        particella: "456",
        clienteId: 4,
        geometraId: 2,
      },
      {
        titolo: "Perizia di Stima Immobiliare",
        descrizione: "Perizia di stima per immobile residenziale.",
        stato: "sospesa",
        indirizzo: "Via Veneto 100, Roma",
        foglio: "12",
        particella: "301",
        clienteId: 2,
        geometraId: 2,
      },
      {
        titolo: "Confinamento e Mappatura",
        descrizione: "Rilievo topografico e definizione confini catastali.",
        stato: "chiusa",
        indirizzo: "Via Toscana 7, Milano",
        foglio: "3",
        particella: "89",
        clienteId: 1,
        geometraId: 2,
      },
    ]);

    await db.insert(praticheClienti).values([
      { praticaId: 1, clienteId: 1 },
      { praticaId: 2, clienteId: 2 },
      { praticaId: 3, clienteId: 3 },
      { praticaId: 4, clienteId: 4 },
      { praticaId: 5, clienteId: 2 },
      { praticaId: 6, clienteId: 1 },
      { praticaId: 1, clienteId: 3 },
    ]);

    await db.insert(tickets).values([
      {
        titolo: "Documentazione mancante per frazionamento",
        messaggio: "C'è bisogno della planimetria aggiornata per procedere con il frazionamento.",
        stato: "aperto",
        praticaId: 1,
        clienteId: 1,
        geometraId: 2,
      },
      {
        titolo: "Richiesta info perizia",
        messaggio: "Vorrei sapere quando sarà pronta la perizia di stima.",
        stato: "in_lavorazione",
        praticaId: 5,
        clienteId: 2,
        geometraId: 2,
      },
    ]);

    return NextResponse.json({
      success: true,
      message: "Database popolato con dati demo",
      data: { users: 3, clienti: 4, pratiche: 6, tickets: 2 },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Errore durante il seeding del database" },
      { status: 500 }
    );
  }
}
