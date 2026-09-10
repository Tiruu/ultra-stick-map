import { useEffect, useState } from "react";

type PresentationPopupProps = {
  onClose: () => void;
};

const STORAGE_KEY = "stick-map-show-presentation";

export default function PresentationPopup({ onClose }: PresentationPopupProps) {
  const [showEveryLaunch, setShowEveryLaunch] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) !== "false";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(showEveryLaunch));
  }, [showEveryLaunch]);

  return (
    <div className="presentation-overlay" role="dialog" aria-modal="true" aria-labelledby="presentation-title">
      <div className="presentation-modal">
        <button className="presentation-close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>

        <p className="presentation-kicker">Bienvenue sur Stick Map</p>
        <h1 id="presentation-title">Une carte communautaire de sticks</h1>

        <p>
          Stick Map permet de cartographier des sticks et autres points physiques
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

        <label className="presentation-checkbox">
          <input
            type="checkbox"
            checked={showEveryLaunch}
            onChange={(event) => setShowEveryLaunch(event.target.checked)}
          />
          <span>Afficher cette présentation à chaque lancement</span>
        </label>

        <button className="presentation-confirm" onClick={onClose}>
          J&apos;ai compris
        </button>
      </div>
    </div>
  );
}

export function shouldShowPresentation(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== "false";
}
