import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("login page renders correctly", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("GeoGest").first()).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("shows error with invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("wrong@email.com");
    await page.locator('input[type="password"]').fill("wrongpassword");
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText("Credenziali non valide")).toBeVisible({
      timeout: 10000,
    });
  });

  test("login as admin and redirect to dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();

    await page.waitForURL("**/dashboard", { timeout: 15000 });
    expect(page.url()).toContain("/dashboard");
    await expect(page.getByText("Dashboard").first()).toBeVisible();
  });

  test("login as geometra and redirect to dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("laura@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();

    await page.waitForURL("**/dashboard", { timeout: 15000 });
    expect(page.url()).toContain("/dashboard");
  });

  test("login as cliente and redirect to portal", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("giuseppe@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();

    await page.waitForURL("**/portal", { timeout: 15000 });
    expect(page.url()).toContain("/portal");
    await expect(page.getByText("Benvenuto").first()).toBeVisible();
  });

  test("dashboard shows stats after login", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();

    await page.waitForURL("**/dashboard", { timeout: 15000 });
    await expect(page.getByText("Pratiche Totali")).toBeVisible();
    await expect(page.getByText("Clienti").first()).toBeVisible();
  });

  test("navigate to pratiche page from dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();

    await page.waitForURL("**/dashboard", { timeout: 15000 });
    await page.locator("a", { hasText: "Pratiche" }).first().click();
    await page.waitForURL("**/pratiche", { timeout: 10000 });
    await expect(page.getByText("Gestisci le tue pratiche")).toBeVisible({
      timeout: 15000,
    });
  });

  test("protected routes redirect to login", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForURL("**/login", { timeout: 10000 });
    expect(page.url()).toContain("/login");
  });

  test("logout works", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@geogest.it");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();

    await page.waitForURL("**/dashboard", { timeout: 15000 });

    await page.locator('button[title="Esci"]').click();
    await page.waitForURL("**/login", { timeout: 10000 });
    expect(page.url()).toContain("/login");
  });
});
