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
              Les utilisateurs peuvent ajouter un stick, puis confirmer qu&apos;il est
              toujours présent ou signaler qu&apos;il a disparu.
            </p>
            <p className="presentation-warning">
              Les informations sont fournies par les utilisateurs et peuvent être
              incomplètes, anciennes ou incorrectes.
            </p>
          </>
        ) : (
          <>
            <p className="presentation-kicker">Comment ça marche ?</p>
            <h1 id="presentation-title">Une carte vérifiée par la communauté</h1>

            <p>
              Chaque stick évolue selon les retours des utilisateurs qui le rencontrent
              sur le terrain. L&apos;objectif est de garder la carte aussi fiable que possible
              dans le temps.
            </p>

            <div style={{ display: "grid", gap: 10, margin: "18px 0" }}>
              <div style={{ padding: "11px 13px", borderRadius: 10, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <strong>Présent</strong>
                <div style={{ marginTop: 3, color: "#64748b", fontSize: 13 }}>
                  Des utilisateurs ont confirmé que le stick est toujours là.
                </div>
              </div>
              <div style={{ padding: "11px 13px", borderRadius: 10, background: "#f8fafc", border: "1px solid #dbe4ef" }}>
                <strong>Inconnu</strong>
                <div style={{ marginTop: 3, color: "#64748b", fontSize: 13 }}>
                  Il n&apos;y a pas encore assez de retours pour déterminer son état.
                </div>
              </div>
              <div style={{ padding: "11px 13px", borderRadius: 10, background: "#fff7ed", border: "1px solid #fed7aa" }}>
                <strong>Absent</strong>
                <div style={{ marginTop: 3, color: "#64748b", fontSize: 13 }}>
                  Plusieurs signalements concordants indiquent qu&apos;il pourrait avoir disparu.
                </div>
              </div>
            </div>

            <p>
              <strong>Une confirmation récente peut remettre un stick comme présent</strong>{" "}
              après des signalements. Un signalement isolé ne suffit pas à lui seul à le
              faire disparaître : le système cherche à limiter les erreurs et les abus.
            </p>

            <p>
              En pratique : vous trouvez un stick → vous le consultez → vous confirmez
              sa présence ou vous le signalez s&apos;il n&apos;est plus là. C&apos;est cette boucle
              communautaire qui permet de maintenir la carte à jour.
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
