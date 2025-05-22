import type { Period } from "@/features/periods/types/period";
import type { User } from "./user";

export type SessionState = {
  user: User | null;
  jwt: string | null;
  setUser: (user: User) => void;
  setJwt: (jwt: string) => void;
  logout: () => void;
  period: Period | null;
  setPeriod: (period: Period) => void;
  isHydrated: boolean;
  setHydrated: () => void;
};
