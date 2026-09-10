import { test, expect } from "@playwright/test";

test("la page légale est accessible depuis l'application", async ({ page }) => {
  await page.goto("/");

  const legalLink = page.getByRole("link", {
    name: "Mentions légales, confidentialité et règles communautaires",
  });

  await expect(legalLink).toBeVisible();
  await expect(legalLink).toHaveAttribute("href", "/legal.html");

  await legalLink.click();
  await expect(page).toHaveURL(/\/legal\.html$/);
  await expect(page).toHaveTitle(/Mentions légales/i);
  await expect(page.getByRole("heading", { name: /Mentions légales/i })).toBeVisible();
});

test("le classement public est accessible", async ({ page }) => {
  await page.goto("/");

  const presentation = page.locator(".presentation-overlay");
  if (await presentation.isVisible()) {
    await page.getByRole("button", { name: "Voir le fonctionnement" }).click();
    await page.getByRole("button", { name: "J'ai compris" }).click();
  }

  await page.getByRole("button", { name: /Classement/ }).click();
  await expect(page.locator(".ranking-overlay")).toBeVisible();
  await expect(page.getByText("Classement", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "✕" }).click();
  await expect(page.locator(".ranking-overlay")).toHaveCount(0);
});

test("le bouton d'ajout reste protégé pour un visiteur", async ({ page }) => {
  await page.goto("/");

  const presentation = page.locator(".presentation-overlay");
  if (await presentation.isVisible()) {
    await page.getByRole("button", { name: "Voir le fonctionnement" }).click();
    await page.getByRole("button", { name: "J'ai compris" }).click();
  }

  const addButton = page.getByRole("button", { name: /Ajouter un stick/ });
  await expect(addButton).toBeDisabled();
  await expect(page.locator(".stick-form")).toHaveCount(0);
});
