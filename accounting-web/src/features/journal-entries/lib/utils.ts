import { z } from "zod";

import type { JournalLine } from "@/features/journal-lines/types/journal-line";
import type {
  EntryStatus,
  JournalEntry,
} from "@/features/journal-entries/types/journal-entry";

export const NEW_JOURNAL_ENTRY_MESSAGES = {
  SUCCESS: "Asiento contable creado con éxito",
  ERROR: "Error al crear el asiento contable",
};

export const UPDATE_JOURNAL_ENTRY_MESSAGES = {
  SUCCESS: "Asiento contable actualizado con éxito",
  ERROR: "Error al actualizar el asiento contable",
};

export const DELETE_JOURNAL_ENTRY_MESSAGES = {
  SUCCESS: "Asiento contable eliminado con éxito",
  ERROR: "Error al eliminar el asiento contable",
};

export const JOURNAL_ENTRIES_ROUTES = {
  NEW: "/home/journal-entries/new",
  EDIT: "/home/journal-entries/edit",
};

export const journalEntrySchema = z.object({
  date: z.string().min(1, "La fecha es obligatoria"),
  number: z.string().min(1, "El número de asiento es obligatorio"),
  description: z.string().optional(),
  entry_status: z.enum(["draft", "posted", "cancelled"]),
  journal_lines: z
    .array(
      z.object({
        account: z.object({
          documentId: z.string().min(1, "La cuenta es obligatoria"),
          name: z.string().optional(),
          type: z.string().optional(),
          code: z.string().optional(),
        }),
        amount: z.number().min(0, "El monto debe ser mayor a cero"),
        type: z.enum(["debit", "credit"]),
      })
    )
    .refine((lines) => lines.length >= 2, {
      message: "El asiento debe tener al menos dos líneas",
    })
    .refine(
      (lines) => {
        const totalDebito = lines
          .filter((line) => line.type === "debit")
          .reduce((sum, line) => sum + line.amount, 0);
        const totalCredito = lines
          .filter((line) => line.type === "credit")
          .reduce((sum, line) => sum + line.amount, 0);
        return Math.abs(totalDebito - totalCredito) < 0.01;
      },
      {
        message: "El asiento debe estar balanceado (débitos = créditos)",
      }
    ),
});

export type JournalEntryFormData = z.infer<typeof journalEntrySchema>;

export const extractJournalEntryData = (formData: FormData): JournalEntry => {
  const journalLines = JSON.parse(
    formData.get("journal-lines") as string
  ) as JournalLine[];

  const journalEntryData: JournalEntry = {
    date: formData.get("date") as string,
    number: String(formData.get("number")),
    description: (formData.get("description") as string) || "",
    entry_status: (formData.get("entry_status") as EntryStatus) || "posted",
    journal_lines: journalLines,
  };
  if (formData.get("documentId")) {
    journalEntryData.documentId = formData.get("documentId") as string;
  }
  return journalEntryData;
};

export const validateJournalEntryData = (data: JournalEntry) => {
  return journalEntrySchema.safeParse(data);
};
