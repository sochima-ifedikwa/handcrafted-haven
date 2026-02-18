"use client";

import { useMemo, useSyncExternalStore } from "react";

export type CurrentUser = {
  firstName: string;
  lastName: string;
  email: string;
  accountType: "buyer" | "artisan";
};

const AUTH_CHANGE_EVENT = "auth-change";

const subscribe = (onStoreChange: () => void) => {
  const handler = () => onStoreChange();

  window.addEventListener("storage", handler);
  window.addEventListener(AUTH_CHANGE_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(AUTH_CHANGE_EVENT, handler);
  };
};

const getSnapshot = () =>
  localStorage.getItem("currentUser") ??
  sessionStorage.getItem("currentUser") ??
  "";

const getServerSnapshot = () => "";

export const notifyAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const useCurrentUser = (): CurrentUser | null => {
  const rawUser = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return useMemo(() => {
    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as CurrentUser;
    } catch {
      return null;
    }
  }, [rawUser]);
};
