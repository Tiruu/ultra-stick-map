import { useEffect, useState } from "react";

type PresentationPopupProps = {
  onClose: () => void;
};

const STORAGE_KEY = "stick-map-show-presentation";

export default function PresentationPopup({ onClose }: PresentationPopupProps) {
  const [showEveryLaunch, setShowEveryLaunch] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) !== "false";
  });
  const [page, setPage] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(showEveryLaunch));
  }, [showEveryLaunch]);

  const isHowItWorksPage = page === 1;

  return (
    <div className="presentation-overlay" role="dialog" aria-modal="true" aria-labelledby="presentation-title">
      <div className="presentation-modal">
        <button className="presentation-close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>

        {!isHowItWorksPage ? (
          <>
            <p className="presentation-kicker">Bienvenue sur Ultra Stick Map</p>
            <h1 id="presentation-title">Une carte communautaire de sticks</h1>

            <p>
              Ultra Stick Map permet de cartographier des sticks et autres points physiques
              ajoutés par la communauté.
            </p>
            <p>
              Un stick peut être ajouté depuis n&apos;importe où. Il reste en attente jusqu&apos;à
              ce qu&apos;un modérateur vérifie la publication et décide de l&apos;accepter ou de la refuser.
            </p>
            <p className="presentation-warning">
              Les informations sont fournies par les utilisateurs et peuvent être
              incomplètes, anciennes ou incorrectes.
            </p>
          </>
        ) : (
          <>
            <p className="presentation-kicker">Comment ça marche ?</p>
            <h1 id="presentation-title">Publication puis vérification</h1>

            <p>
              La publication et la vérification sont volontairement séparées : un utilisateur
              peut proposer un stick sans avoir besoin d&apos;un autre utilisateur sur place.
              Les modérateurs disposent ensuite d&apos;une file dédiée pour contrôler les nouvelles
              publications, sans contrainte de distance.
            </p>

            <div style={{ display: "grid", gap: 10, margin: "18px 0" }}>
              <div style={{ padding: "11px 13px", borderRadius: 10, background: "#fff7ed", border: "1px solid #fed7aa" }}>
                <strong>En attente</strong>
                <div style={{ marginTop: 3, color: "#64748b", fontSize: 13 }}>
                  Le stick vient d&apos;être proposé et attend une décision de modération.
                </div>
              </div>
              <div style={{ padding: "11px 13px", borderRadius: 10, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <strong>Validé</strong>
                <div style={{ marginTop: 3, color: "#64748b", fontSize: 13 }}>
                  Un modérateur a accepté le stick : il devient visible sur la carte.
                </div>
              </div>
              <div style={{ padding: "11px 13px", borderRadius: 10, background: "#f8fafc", border: "1px solid #dbe4ef" }}>
                <strong>Vérification communautaire</strong>
                <div style={{ marginTop: 3, color: "#64748b", fontSize: 13 }}>
                  Une fois publié, les utilisateurs peuvent confirmer sa présence ou signaler sa disparition.
                </div>
              </div>
            </div>

            <p>
              <strong>Une seule décision de modération suffit.</strong> Un modérateur peut
              valider ou refuser un nouveau stick à distance. Il peut consulter sa photo,
              sa description et son emplacement avant de prendre sa décision.
            </p>

            <p>
              Ensuite : vous trouvez un stick → vous le consultez → vous confirmez sa présence
              ou vous le signalez s&apos;il n&apos;est plus là. Ces retours permettent de garder la carte
              à jour dans le temps.
            </p>
          </>
        )}

        <div
          aria-label={`Page ${page + 1} sur 2`}
          style={{ display: "flex", justifyContent: "center", gap: 7, margin: "18px 0 14px" }}
        >
          {[0, 1].map((index) => (
            <button
              key={index}
              type="button"
              aria-label={`Aller à la page ${index + 1}`}
              onClick={() => setPage(index)}
              style={{
                width: index === page ? 22 : 8,
                height: 8,
                padding: 0,
                border: 0,
                borderRadius: 999,
                background: index === page ? "#0057a8" : "#cbd5e1",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {isHowItWorksPage && (
            <button
              type="button"
              onClick={() => setPage(0)}
              style={{
                flex: 1,
                minHeight: 44,
                border: "1px solid #dbe4ef",
                borderRadius: 8,
                background: "#f4f7fb",
                color: "#122033",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Retour
            </button>
          )}

          {!isHowItWorksPage ? (
            <button
              type="button"
              onClick={() => setPage(1)}
              style={{
                flex: 1,
                minHeight: 44,
                border: 0,
                borderRadius: 8,
                background: "#0057a8",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Voir le fonctionnement
            </button>
          ) : (
            <button
              className="presentation-confirm"
              onClick={onClose}
              style={{ flex: 1 }}
            >
              J&apos;ai compris
            </button>
          )}
        </div>

        <label className="presentation-checkbox" style={{ marginTop: 14 }}>
          <input
            type="checkbox"
            checked={showEveryLaunch}
            onChange={(event) => setShowEveryLaunch(event.target.checked)}
          />
          <span>Afficher cette présentation à chaque lancement</span>
        </label>
      </div>
    </div>
  );
}

export function shouldShowPresentation(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== "false";
}
