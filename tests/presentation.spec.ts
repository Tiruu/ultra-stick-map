import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.removeItem("stick-map-show-presentation"));
  await page.reload();
});

test("la présentation utilisateur fonctionne de bout en bout", async ({ page }) => {
  const presentation = page.locator(".presentation-overlay");

  await expect(presentation).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Une carte communautaire de sticks" }),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "Voir le fonctionnement" })
    .click();

  await expect(
    page.getByRole("heading", { name: "Publication puis vérification" }),
  ).toBeVisible();
  await expect(page.getByText("Une seule décision de modération suffit.")).toBeVisible();

  await page.getByRole("button", { name: "Retour" }).click();
  await expect(
    page.getByRole("heading", { name: "Une carte communautaire de sticks" }),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "Voir le fonctionnement" })
    .click();
  await page.getByRole("button", { name: "J'ai compris" }).click();

  await expect(presentation).toHaveCount(0);
});

test("la préférence de présentation est mémorisée", async ({ page }) => {
  const presentation = page.locator(".presentation-overlay");

  await expect(presentation).toBeVisible();

  const checkbox = page.getByRole("checkbox", {
    name: "Afficher cette présentation à chaque lancement",
  });

  await expect(checkbox).toBeChecked();
  await checkbox.uncheck();
  await expect(checkbox).not.toBeChecked();

  await page.getByRole("button", { name: "Voir le fonctionnement" }).click();
  await page.getByRole("button", { name: "J'ai compris" }).click();
  await expect(presentation).toHaveCount(0);

  await page.reload();
  await expect(presentation).toHaveCount(0);
});
