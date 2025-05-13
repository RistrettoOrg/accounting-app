import type { Account } from "@/features/accounts/types/account";
import type { JournalEntry } from "@/features/journal-entries/types/journal-entry";

export type JournalLine = {
  documentId?: string; // ID del asiento contable
  journalEntry?: JournalEntry; // Asiento contable al que pertenece la línea
  account: Account; // ID de la cuenta
  description?: string;
  amount: number;
  type: "debit" | "credit";
};
