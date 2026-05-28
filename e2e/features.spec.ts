import { test, expect } from "@playwright/test";

test.describe("Pratiche - Multi-Client Association", () => {
  test("pratica detail shows multi-client checkboxes", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/dashboard", { timeout: 15000 });

    await page.goto("/pratiche/1");
    await expect(page.getByText("Dettagli")).toBeVisible({ timeout: 15000 });

    await expect(page.getByText("Clienti associati")).toBeVisible();
    await expect(page.getByText("Giuseppe Rossi")).toBeVisible();
    await expect(page.getByText("Franco Esposito")).toBeVisible();
  });

  test("geometra can change pratica status", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("laura@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/dashboard", { timeout: 15000 });

    await page.goto("/pratiche/1");
    await expect(page.getByText("Aggiorna")).toBeVisible({ timeout: 15000 });

    await page.locator('select').first().selectOption("in_corso");
    await page.getByRole("button", { name: "Salva Modifiche" }).click();
    await expect(page.locator('span:has-text("In Corso")').first()).toBeVisible({ timeout: 10000 });
  });

  test("pratiche list shows multiple clients", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/dashboard", { timeout: 15000 });

    await page.goto("/pratiche");
    await expect(page.locator('h1:has-text("Pratiche")')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText("Giuseppe Rossi").first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Franco Esposito").first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Pratiche - Document Visibility", () => {
  test("documenti page shows visibile_al_cliente status", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/dashboard", { timeout: 15000 });

    await page.goto("/pratiche/1");
    await expect(page.locator('h2:has-text("Documenti")')).toBeVisible({ timeout: 15000 });

    await expect(page.getByText("Visibile al cliente")).toBeVisible();
  });
});

test.describe("Clienti - User Account Creation", () => {
  test("clienti page shows create account button", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/dashboard", { timeout: 15000 });

    await page.goto("/clienti");
    await expect(page.locator('h1:has-text("Clienti")')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText("Utente attivo")).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Clienti Portal - View Pratiche and Tickets", () => {
  test("client sees assigned pratiche", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("giuseppe@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/portal", { timeout: 15000 });
    await expect(page.getByText("Benvenuto")).toBeVisible();
    await expect(page.locator('h2:has-text("Le tue Pratiche")')).toBeVisible({ timeout: 10000 });
  });

  test("client can open ticket from pratica detail", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("giuseppe@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/portal", { timeout: 15000 });

    await page.goto("/portal/pratiche/1");
    await expect(page.getByText("Apri Ticket")).toBeVisible({ timeout: 15000 });

    await page.getByPlaceholder("es. Documentazione mancante").fill("Test ticket E2E");
    await page.getByPlaceholder("Descrivi il tuo problema").fill("Messaggio test E2E");
    await page.getByRole("button", { name: "Invia Ticket" }).click();
    await expect(page.getByText("Ticket inviato")).toBeVisible({ timeout: 10000 });
  });

  test("client sees tickets in portal", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("giuseppe@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/portal", { timeout: 15000 });

    await expect(page.locator('h2:has-text("I tuoi Ticket")')).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Tickets - Geometra Management", () => {
  test("geometra can see tickets page", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("laura@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/dashboard", { timeout: 15000 });

    await page.locator("a", { hasText: "Ticket" }).first().click();
    await page.waitForURL("**/tickets", { timeout: 10000 });
    await expect(page.getByText("Gestisci i ticket dei clienti")).toBeVisible();
  });

  test("tickets page shows filter buttons", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("laura@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/dashboard", { timeout: 15000 });

    await page.goto("/tickets");
    await expect(page.getByRole("button", { name: "Tutti" })).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("button", { name: "Aperto" })).toBeVisible();
    await expect(page.getByRole("button", { name: "In Lavorazione" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Risolto" })).toBeVisible();
  });
});

test.describe("Admin - Create Geometra User", () => {
  test("admin can access utenti page with create form", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/dashboard", { timeout: 15000 });

    await page.goto("/utenti");
    await expect(page.locator('h1:has-text("Utenti")')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("button", { name: "Nuovo Utente" })).toBeVisible();
  });

  test("admin can create a new geometra user", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/dashboard", { timeout: 15000 });

    await page.goto("/utenti");
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: "Nuovo Utente" }).click();

    await page.getByPlaceholder("Mario Rossi").fill("Test Geometra");
    await page.getByPlaceholder("email@esempio.it").fill("test.geo@geogest.it");
    await page.getByPlaceholder("Min. 6 caratteri").fill("password123");
    await page.locator('select').last().selectOption("geometra");
    await page.getByRole("button", { name: "Crea Utente" }).click();

    await expect(page.getByText("Test Geometra")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("test.geo@geogest.it")).toBeVisible();
  });
});

test.describe("Dashboard - Ticket Stats", () => {
  test("dashboard shows ticket stat card", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/dashboard", { timeout: 15000 });

    await expect(page.getByText("Ticket Aperti")).toBeVisible({ timeout: 15000 });
    await expect(page.locator('h2:has-text("Ticket Recenti")')).toBeVisible();
  });
});
