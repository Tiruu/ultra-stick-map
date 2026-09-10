import { test, expect } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.E2E_SUPABASE_URL;
const supabaseKey = process.env.E2E_SUPABASE_PUBLISHABLE_KEY;
const email = process.env.E2E_EMAIL;
const password = process.env.E2E_PASSWORD;

const hasCredentials = Boolean(
  supabaseUrl && supabaseKey && email && password,
);

test.skip(!hasCredentials, "Variables E2E_* manquantes pour le compte de test authentifié");

test("un utilisateur authentifié peut ouvrir le formulaire d'ajout sans publier", async ({
  page,
  context,
}) => {
  const supabase = createClient(supabaseUrl!, supabaseKey!);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email!,
    password: password!,
  });

  expect(error).toBeNull();
  expect(data.session).not.toBeNull();

  const projectRef = new URL(supabaseUrl!).hostname.split(".")[0];
  const storageKey = `sb-${projectRef}-auth-token`;
  const session = data.session!;

  await page.addInitScript(
    ({ key, session: initialSession }) => {
      localStorage.setItem(key, JSON.stringify(initialSession));
      localStorage.setItem("stick-map-show-presentation", "false");
    },
    { key: storageKey, session },
  );

  await context.grantPermissions(["geolocation"]);
  await context.setGeolocation({ latitude: 47.8267, longitude: 0.1867 });
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Profil" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Déconnexion" })).toBeVisible();

  const addButton = page.getByRole("button", { name: /Ajouter un stick/ });
  await expect(addButton).toBeEnabled();
  await addButton.click();

  await expect(
    page.getByText("Emplacement sélectionné", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Valider la position" }).click();

  const form = page.locator(".stick-form");
  await expect(form).toBeVisible();
  await expect(
    form.getByRole("heading", { name: "Ajouter un stick" }),
  ).toBeVisible();

  const saveButton = form.getByRole("button", { name: "Ajouter" });
  await expect(saveButton).toBeDisabled();

  await form.getByRole("button", { name: /Je l'ai vu/ }).click();
  await expect(saveButton).toBeDisabled();

  await page.getByRole("button", { name: "Annuler" }).click();
  await expect(form).toHaveCount(0);
});
