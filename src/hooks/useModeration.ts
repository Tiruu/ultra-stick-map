import { useCallback, useEffect, useState } from "react";

import type { Stick } from "../types";
import { getActionErrorMessage } from "../utils/actionErrors";

import {
  getPendingSticks,
  moderatePendingStick,
  getReviewSticks,
  approveReviewedStick,
  rejectReviewedStick,
} from "../services/sticks";

type UserLike = {
  id: string;
} | null;

type UseModerationOptions = {
  user: UserLike;
  isAdmin: boolean;
  onError: (message: string) => void;
};

export function useModeration({
  user,
  isAdmin,
  onError,
}: UseModerationOptions) {
  const [pendingSticks, setPendingSticks] = useState<Stick[]>([]);
  const [reviewSticks, setReviewSticks] = useState<Stick[]>([]);
  const [validationIndex, setValidationIndex] = useState(0);
  const [adminModerationIndex, setAdminModerationIndex] = useState(0);

  const loadPendingSticks = useCallback(async () => {
    if (!isAdmin) {
      setPendingSticks([]);
      return;
    }

    try {
      const data = await getPendingSticks();
      setPendingSticks(data);
    } catch (error) {
      console.error("Erreur chargement sticks en attente :", error);
    }
  }, [isAdmin]);

  const loadReviewSticks = useCallback(async () => {
    if (!isAdmin) {
      setReviewSticks([]);
      return;
    }

    try {
      const data = await getReviewSticks();
      setReviewSticks(data);
    } catch (error) {
      console.error("Erreur chargement modération :", error);
    }
  }, [isAdmin]);

  const handleValidationVote = useCallback(
    async (stick: Stick, vote: "approve" | "reject") => {
      if (!user || !isAdmin) return;

      try {
        await moderatePendingStick(
          stick.id,
          vote === "approve" ? "approved" : "rejected",
        );

        await loadPendingSticks();
        setValidationIndex((current) =>
          Math.min(current, Math.max(0, pendingSticks.length - 2)),
        );
      } catch (error) {
        console.error("Erreur modération :", error);
        onError(getActionErrorMessage(error));
      }
    },
    [user, isAdmin, loadPendingSticks, pendingSticks.length, onError],
  );

  const handleAdminApproveStick = useCallback(
    async (stick: Stick) => {
      try {
        await approveReviewedStick(stick.id);
        await loadReviewSticks();
        setAdminModerationIndex(0);
      } catch (error) {
        console.error("Erreur validation admin :", error);
      }
    },
    [loadReviewSticks],
  );

  const handleAdminRejectStick = useCallback(
    async (stick: Stick) => {
      try {
        await rejectReviewedStick(stick.id);
        await loadReviewSticks();
        setAdminModerationIndex(0);
      } catch (error) {
        console.error("Erreur refus admin :", error);
      }
    },
    [loadReviewSticks],
  );

  useEffect(() => {
    if (!user || !isAdmin) {
      setPendingSticks([]);
      return;
    }

    void loadPendingSticks();
  }, [user, isAdmin, loadPendingSticks]);

  useEffect(() => {
    void loadReviewSticks();
  }, [loadReviewSticks]);

  return {
    pendingSticks,
    reviewSticks,

    validationIndex,
    setValidationIndex,

    adminModerationIndex,
    setAdminModerationIndex,

    loadPendingSticks,
    loadReviewSticks,

    handleValidationVote,
    handleAdminApproveStick,
    handleAdminRejectStick,
  };
}
