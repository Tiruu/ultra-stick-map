import { test, expect } from "@playwright/test";

test("l'ajout d'un stick est réservé aux utilisateurs connectés", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.removeItem("stick-map-show-presentation"));
  await page.reload();

  const presentation = page.locator(".presentation-overlay");
  if (await presentation.isVisible()) {
    await page.getByRole("button", { name: "Voir le fonctionnement" }).click();
    await page.getByRole("button", { name: "J'ai compris" }).click();
  }

  await expect(presentation).toHaveCount(0);

  const addStickButton = page.getByRole("button", {
    name: "+ Ajouter un stick",
  });

  await expect(addStickButton).toBeVisible();
  await expect(addStickButton).toBeDisabled();
});
