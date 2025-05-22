import type { Period } from "@/features/periods/types/period";
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
      period: null,
      setPeriod: (period) => set({ period }),
    }),
    {
      name: "user-session", // the key used in localStorage to store the session
    }
  )
);
