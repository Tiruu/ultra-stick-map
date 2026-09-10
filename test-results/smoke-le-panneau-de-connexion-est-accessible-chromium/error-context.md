# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> le panneau de connexion est accessible
- Location: tests\smoke.spec.ts:13:1

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - region "Map" [ref=e4]
      - group [ref=e5]:
        - generic "Toggle attribution" [ref=e6] [cursor=pointer]
        - link "MapLibre" [ref=e8] [cursor=pointer]:
          - /url: https://maplibre.org/
    - dialog [ref=e9]:
      - generic [ref=e10]:
        - button "Fermer" [ref=e11] [cursor=pointer]: ✕
        - paragraph [ref=e12]: Comment ça marche ?
        - heading "Publication puis vérification" [level=1] [ref=e13]
        - paragraph [ref=e14]: "La publication et la vérification sont volontairement séparées : un utilisateur peut proposer un stick sans avoir besoin d'un autre utilisateur sur place. Les modérateurs disposent ensuite d'une file dédiée pour contrôler les nouvelles publications, sans contrainte de distance."
        - generic [ref=e15]:
          - generic [ref=e16]:
            - strong [ref=e17]: En attente
            - generic [ref=e18]: Le stick vient d'être proposé et attend une décision de modération.
          - generic [ref=e19]:
            - strong [ref=e20]: Validé
            - generic [ref=e21]: "Un modérateur a accepté le stick : il devient visible sur la carte."
          - generic [ref=e22]:
            - strong [ref=e23]: Vérification communautaire
            - generic [ref=e24]: Une fois publié, les utilisateurs peuvent confirmer sa présence ou signaler sa disparition.
        - paragraph [ref=e25]:
          - strong [ref=e26]: Une seule décision de modération suffit.
          - text: Un modérateur peut valider ou refuser un nouveau stick à distance. Il peut consulter sa photo, sa description et son emplacement avant de prendre sa décision.
        - paragraph [ref=e27]: "Ensuite : vous trouvez un stick → vous le consultez → vous confirmez sa présence ou vous le signalez s'il n'est plus là. Ces retours permettent de garder la carte à jour dans le temps."
        - generic "Page 2 sur 2" [ref=e28]:
          - button "Aller à la page 1" [ref=e29] [cursor=pointer]
          - button "Aller à la page 2" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - button "Retour" [ref=e32] [cursor=pointer]
          - button "J'ai compris" [active] [ref=e33] [cursor=pointer]
        - generic [ref=e34] [cursor=pointer]:
          - checkbox "Afficher cette présentation à chaque lancement" [checked] [ref=e35]
          - generic [ref=e36]: Afficher cette présentation à chaque lancement
    - button "Se connecter" [ref=e37] [cursor=pointer]
    - button "+ Ajouter un stick" [disabled] [ref=e38]
    - button "🏆 Classement" [ref=e39] [cursor=pointer]
  - link "Mentions légales, confidentialité et règles communautaires" [ref=e40] [cursor=pointer]:
    - /url: /legal.html
    - text: Mentions légales · Confidentialité · Règles
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("Ultra Stick Map démarre correctement", async ({ page }) => {
  4  |   await page.goto("/");
  5  | 
  6  |   await expect(page).toHaveTitle("Ultra Stick Map");
  7  | 
  8  |   await expect(
  9  |     page.getByText("Ultra Stick Map", { exact: false }).first(),
  10 |   ).toBeVisible();
  11 | });
  12 | 
  13 | test("le panneau de connexion est accessible", async ({ page }) => {
  14 |   await page.goto("/");
  15 | 
  16 |   const presentation = page.locator(".presentation-overlay");
  17 |   const presentationModal = page.locator(".presentation-modal");
  18 | 
  19 |   if (await presentation.isVisible()) {
  20 |     await page.getByRole("button", { name: "Voir le fonctionnement" }).click();
  21 | 
  22 |     // La deuxième page est volontairement plus longue :
  23 |     // on vérifie que le modal peut défiler.
  24 |     const scrollTop = await presentationModal.evaluate((element) => {
  25 |       element.scrollTo({
  26 |         top: element.scrollHeight,
  27 |         behavior: "instant",
  28 |       });
  29 | 
  30 |       return element.scrollTop;
  31 |     });
  32 | 
> 33 |     expect(scrollTop).toBeGreaterThan(0);
     |                       ^ Error: expect(received).toBeGreaterThan(expected)
  34 | 
  35 |     const understoodButton = page.getByRole("button", {
  36 |       name: "J'ai compris",
  37 |     });
  38 | 
  39 |     await understoodButton.scrollIntoViewIfNeeded();
  40 |     await expect(understoodButton).toBeVisible();
  41 | 
  42 |     await understoodButton.click();
  43 |   }
  44 | 
  45 |   await expect(presentation).toHaveCount(0);
  46 | 
  47 |   await page.getByRole("button", { name: "Se connecter" }).click();
  48 | 
  49 |   await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  50 | 
  51 |   await expect(page.getByPlaceholder("Email")).toBeVisible();
  52 |   await expect(page.getByPlaceholder("Mot de passe")).toBeVisible();
  53 | 
  54 |   await expect(
  55 |     page.getByRole("button", { name: "Se connecter" }),
  56 |   ).toBeDisabled();
  57 | });
```