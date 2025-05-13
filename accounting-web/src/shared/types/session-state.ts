import type { User } from "./user";

export type SessionState = {
  user: User | null;
  jwt: string | null;
  setUser: (user: User) => void;
  setJwt: (jwt: string) => void;
  logout: () => void;
  isHydrated: boolean;
  setHydrated: () => void;
};
