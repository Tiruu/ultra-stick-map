import { test, expect } from "@playwright/test";

test("Ultra Stick Map démarre correctement", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Ultra Stick Map");

  await expect(
    page.getByText("Ultra Stick Map", { exact: false }).first(),
  ).toBeVisible();
});

test("le panneau de connexion est accessible", async ({ page }) => {
  await page.goto("/");

  const presentation = page.locator(".presentation-overlay");
  const presentationModal = page.locator(".presentation-modal");

  if (await presentation.isVisible()) {
    await page.getByRole("button", { name: "Voir le fonctionnement" }).click();

    // La deuxième page est volontairement plus longue :
    // on vérifie que le modal peut défiler.
    const scrollTop = await presentationModal.evaluate((element) => {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: "instant",
      });

      return element.scrollTop;
    });

    expect(scrollTop).toBeGreaterThan(0);

    const understoodButton = page.getByRole("button", {
      name: "J'ai compris",
    });

    await understoodButton.scrollIntoViewIfNeeded();
    await expect(understoodButton).toBeVisible();

    await understoodButton.click();
  }

  await expect(presentation).toHaveCount(0);

  await page.getByRole("button", { name: "Se connecter" }).click();

  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();

  await expect(page.getByPlaceholder("Email")).toBeVisible();
  await expect(page.getByPlaceholder("Mot de passe")).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Se connecter" }),
  ).toBeDisabled();
});