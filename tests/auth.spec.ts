import { test, expect } from "@playwright/test";

test("le formulaire de connexion bloque la soumission sans CAPTCHA", async ({ page }) => {
  await page.goto("/");

  const presentation = page.locator(".presentation-overlay");
  if (await presentation.isVisible()) {
    await page.getByRole("button", { name: "Voir le fonctionnement" }).click();
    await page.getByRole("button", { name: "J'ai compris" }).click();
  }

  await page.getByRole("button", { name: "Se connecter" }).click();

  const authPanel = page.locator(".auth-panel");
  await expect(authPanel).toBeVisible();
  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();

  const submitButton = authPanel.getByRole("button", { name: "Se connecter" });
  await expect(submitButton).toBeDisabled();

  await page.getByPlaceholder("Email").fill("test@example.com");
  await page.getByPlaceholder("Mot de passe").fill("password-test");
  await expect(submitButton).toBeDisabled();
});

test("le formulaire permet de basculer vers la création de compte", async ({ page }) => {
  await page.goto("/");

  const presentation = page.locator(".presentation-overlay");
  if (await presentation.isVisible()) {
    await page.getByRole("button", { name: "Voir le fonctionnement" }).click();
    await page.getByRole("button", { name: "J'ai compris" }).click();
  }

  await page.getByRole("button", { name: "Se connecter" }).click();
  await page.getByRole("button", { name: "Je n'ai pas encore de compte" }).click();

  await expect(page.getByRole("heading", { name: "Créer un compte" })).toBeVisible();
  await expect(page.getByPlaceholder("Pseudo")).toBeVisible();
  await expect(page.getByPlaceholder("Email")).toBeVisible();
  await expect(page.getByPlaceholder("Mot de passe")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Créer mon compte" }),
  ).toBeDisabled();

  await page.getByRole("button", { name: "J'ai déjà un compte" }).click();
  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
});
