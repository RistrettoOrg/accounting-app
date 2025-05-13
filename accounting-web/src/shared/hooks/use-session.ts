import type { SessionState } from "@/shared/types/session-state";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserSession = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      jwt: null,
      setUser: (user) => set({ user }),
      setJwt: (jwt) => set({ jwt }),
      logout: () => set({ user: null, jwt: null }),
      isHydrated: false,
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "user-session", // the key used in localStorage to store the session
    }
  )
);
