import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ROUTES = {
  HOME: "/home",
  JOURNAL_ENTRIES: "/home/journal-entries",
  ACCOUNTS: "/home/accounts",
  CURRENCIES: "/home/currencies",
};
