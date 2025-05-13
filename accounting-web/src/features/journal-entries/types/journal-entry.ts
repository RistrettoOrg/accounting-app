import type { JournalLine } from "@/features/journal-lines/types/journal-line";

export type JournalEntry = {
  documentId?: string;
  date: string;
  description?: string;
  number: string;
  entry_status: EntryStatus;
  journal_lines: JournalLine[];
  amount?: number;
};

export type EntryStatus = "draft" | "posted" | "cancelled";
